import { PermissionRole } from "../domain/PermissionRole/permissionRole"

export interface IPermissionRoleRepository {
  exists(permissionId: string, roleId: string): Promise<boolean>
  PermissionRoleExists(permissionNames: string[], roleId: string): Promise<boolean>
  create(permissionRole: PermissionRole): Promise<void>
}