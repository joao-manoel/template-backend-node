import { Either, left, right } from "@core/logic/Either";
import { UserRole } from "@modules/Account/domain/UserRole/userRole";
import { RoleNotFoundError } from "@modules/Account/errors/RoleNotFoundError";
import { UserNotFoundError } from "@modules/Account/errors/UserNotFoundError";
import { IRoleRepository } from "@modules/Account/repositories/IRoleRepository";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";
import { IUserRoleRepository } from "@modules/Account/repositories/IUserRoleRepository";
import { RoleAlreadyExistsError } from "./errors/RoleAlreadyAssignedError";
import { RoleIdAndUserIdRequiredError } from "./errors/RoleIdAndUserIdRequiredError";

type PromoteUserRequest = {
  userId: string
  roleId: string
}

type PromoteUserResponse = Either<
  | RoleAlreadyExistsError
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


    if (userId === undefined || roleId === undefined) {
      return left(new RoleIdAndUserIdRequiredError())
    }

    const userExist = await this.userRepository.findById(userId)

    if (!userExist) {
      return left(new UserNotFoundError())
    }

    const roleExist = await this.roleRepository.findById(roleId)

    if (!roleExist) {
      return left(new RoleNotFoundError())
    }

    const roleUserOrError = UserRole.create({ roleId, userId })
    
    if (roleUserOrError.isLeft()) {
      return left(roleUserOrError.value)
    }

    const promoteUser = roleUserOrError.value

    const promoteAlreadyExists = await this.userRoleRepository.exists(userId, roleId)

    if (promoteAlreadyExists) {
      return left(new RoleAlreadyExistsError())
    }

    await this.userRoleRepository.create(promoteUser)

    return right(promoteUser)    
  }
}