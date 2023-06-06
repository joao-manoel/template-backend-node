import { UserRole } from "../domain/UserRole/userRole";

export interface IUserRoleRepository {
  exists(names: string[], userId: string): Promise<boolean>
  create(userRole: UserRole): Promise<void>
}