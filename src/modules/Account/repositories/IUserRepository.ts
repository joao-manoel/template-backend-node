import { User } from "../domain/user/user"

export interface IUserRepository {
  exists(email: string): Promise<boolean>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
}