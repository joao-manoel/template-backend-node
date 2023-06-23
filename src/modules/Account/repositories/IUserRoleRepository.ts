import { UserRole } from "../domain/UserRole/userRole";

export interface IUserRoleRepository {
  exists(userId: string, roleId: string): Promise<boolean>
  UserRoleExists(names: string[], userId: string): Promise<boolean>
  create(userRole: UserRole): Promise<void>
}