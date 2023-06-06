import { UserPermission } from "../domain/UserPermission/userPermission"

export interface IUserPermissionRepository {
  exists(names: string[], userId: string): Promise<boolean>
  create(userPermission: UserPermission): Promise<void>
}