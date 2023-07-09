import { User } from "../domain/user/user"
import { UserWithRoleAndPermission } from "../dtos/UserWithRoleAndPermission"

export interface IUserRepository {
  exists(email: string): Promise<boolean>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findByIdWithRoleAndPermission(id: string): Promise<UserWithRoleAndPermission>
  findByEmailWithRoleAndPermission(email: string): Promise<UserWithRoleAndPermission>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
  findAll(skip: number, take: number): Promise<any>
}