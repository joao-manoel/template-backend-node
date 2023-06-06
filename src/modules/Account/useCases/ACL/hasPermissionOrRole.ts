import { Either } from "@core/logic/Either";
import { IUserPermissionRepository } from "@modules/Account/repositories/IUserPermissionRepository";
import { IUserRoleRepository } from "@modules/Account/repositories/IUserRoleRepository";

type hasRoleOrPermissionResponse = Either<Error | null, boolean>

type hasRoleRequest = {
  userId: string
  rolesName: string[]
  permissionsName: string[]
}

export class hasPermissionOrRole{
  constructor(
    private userRoleRepository: IUserRoleRepository,
    private userPermissionRepository: IUserPermissionRepository
  ) { }
  
  async execute({ userId, rolesName, permissionsName}: hasRoleRequest): Promise<hasRoleOrPermissionResponse> {
    return null
  }
}