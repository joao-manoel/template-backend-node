import { Either, left, right } from "@core/logic/Either";
import { RoleIdAndUserIdRequiredError } from "@modules/Account/domain/UserRole/errors/RoleIdAndUserIdRequiredError";
import { UserRole } from "@modules/Account/domain/UserRole/userRole";
import { RoleNotFoundError } from "@modules/Account/errors/RoleNotFoundError";
import { UserNotFoundError } from "@modules/Account/errors/UserNotFoundError";
import { IRoleRepository } from "@modules/Account/repositories/IRoleRepository";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";
import { IUserRoleRepository } from "@modules/Account/repositories/IUserRoleRepository";
import { AssignmentRoleUserAlreadyExistsError } from "./errors/AssignmentRoleUserAlreadyExistsError";

type PromoteUserRequest = {
  userId: string
  roleId: string
}

type PromoteUserResponse = Either<
  | AssignmentRoleUserAlreadyExistsError
  | UserNotFoundError
  | RoleNotFoundError
  , UserRole>

export class PromoteUser {
  constructor(
    private userRoleRepository: IUserRoleRepository,
    private roleRepository: IRoleRepository,
    private userRepository: IUserRepository
  ) { }
  
  async execute({ userId, roleId }: PromoteUserRequest): Promise<PromoteUserResponse>{

    if (!userId || !roleId) {
      return left(new RoleIdAndUserIdRequiredError())
    }

    //busca o usuario com o id
    const userExist = await this.userRepository.findById(userId)

    //verifica se existe esse usuario
    if (!userExist) {
      return left(new UserNotFoundError())
    }

    //Busca o cargo com o id
    const roleExist = await this.roleRepository.findById(roleId)

    //Verifica se existe esse cargo
    if (!roleExist) {
      return left(new RoleNotFoundError())
    }

    //cria o objeto userRole
    const roleUserOrError = UserRole.create({ roleId, userId })
    
    //verifica se userRole foi validado
    if (roleUserOrError.isLeft()) {
      return left(roleUserOrError.value)
    }

    const promoteUser = roleUserOrError.value

    //Busca se existe ja um registro com esse id's
    const promoteAlreadyExists = await this.userRoleRepository.exists(promoteUser.userId, promoteUser.roleId)

    //Verifica se existe
    if (promoteAlreadyExists) {
      return left(new AssignmentRoleUserAlreadyExistsError())
    }

    //Regista no banco de dados o registro
    await this.userRoleRepository.create(promoteUser)

    //retorna com sucesso
    return right(promoteUser)    
  }
}