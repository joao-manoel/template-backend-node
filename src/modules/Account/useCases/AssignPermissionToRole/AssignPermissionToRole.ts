import { Either, left, right } from "@core/logic/Either";
import { PermissionIdAndRoleIdRequiredError } from "@modules/Account/domain/PermissionRole/errors/PermissionIdAndRoleIdRequiredError";
import { PermissionRole } from "@modules/Account/domain/PermissionRole/permissionRole";
import { PermissionNotFoundError } from "@modules/Account/errors/PermissionNotFoundError";
import { RoleNotFoundError } from "@modules/Account/errors/RoleNotFoundError";
import { IPermissionRepository } from "@modules/Account/repositories/IPermissionRepository";
import { IPermissionRoleRepository } from "@modules/Account/repositories/IPermissionRoleRepository";
import { IRoleRepository } from "@modules/Account/repositories/IRoleRepository";
import { AssignmentPermissionRoleAlreadyExistsError } from "./errors/AssignmentPermissionRoleAlreadyExistsError";

type AssignPermissionToRoleRequest = {
  permissionId: string
  roleId: string
}

type AssignPermissionToRoleResponse = Either<
  | AssignmentPermissionRoleAlreadyExistsError
  | RoleNotFoundError
  | PermissionNotFoundError,
  PermissionRole
>

export class AssignPermissionToRole {
  constructor(
    private roleRepository: IRoleRepository,
    private permissionRepository: IPermissionRepository,
    private permissionRoleRepository: IPermissionRoleRepository
  ) {}
  
  async execute({ permissionId, roleId }: AssignPermissionToRoleRequest):
    Promise<AssignPermissionToRoleResponse>{
    
    if (!permissionId || !roleId) {
      return left(new PermissionIdAndRoleIdRequiredError())
    }

    const roleExist = await this.roleRepository.findById(roleId)

    if (!roleExist) {
      return left(new RoleNotFoundError())
    }

    const permissionExist = await this.permissionRepository.findById(permissionId)

    if (!permissionExist) {
      return left(new PermissionNotFoundError())
    }

    const permissionRoleOrError = PermissionRole.create({ roleId, permissionId })
    
    if (permissionRoleOrError.isLeft()) {
      return left(permissionRoleOrError.value)
    }

    const permissionRole = permissionRoleOrError.value

    const AssignmentPermissionRoleAlreadyExist =
      await this.permissionRoleRepository.exists(
        permissionRole.permissionId,
        permissionRole.roleId
      )

    if (AssignmentPermissionRoleAlreadyExist) {
      return left(new AssignmentPermissionRoleAlreadyExistsError())
    }

    await this.permissionRoleRepository.create(permissionRole)

    return right(permissionRole)
  }

}