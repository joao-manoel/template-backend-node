import { Role } from "../domain/role/role"

export interface IRoleRepository {
  exists(name: string): Promise<boolean>
  findById(id: string): Promise<Role>
  save(role: Role): Promise<void>
  create(role: Role): Promise<void>
}