import { PermissionRole } from "../domain/PermissionRole/permissionRole"

export interface IPermissionRoleRepository {
  exists(permissionNames: string[], roleId: string): Promise<boolean>
  create(permissionRole: PermissionRole): Promise<void>
}