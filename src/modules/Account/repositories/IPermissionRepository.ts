import { Permission } from "../domain/permission/permission"

export interface IPermissionRepository {
  exists(id: string): Promise<boolean>
  findById(id: string): Promise<Permission>
  save(permission: Permission): Promise<void>
  create(permission: Permission): Promise<void>
}