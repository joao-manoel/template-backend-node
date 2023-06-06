import { PermissionRole } from "../domain/PermissionRole/permissionRole"

export interface IPermissionRoleRepository {
  exists(permissionId: string[], roleId: string): Promise<PermissionRole>
  create(userPermission: PermissionRole): Promise<void>
}