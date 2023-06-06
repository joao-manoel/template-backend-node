import { Role as PersistenceRole } from '@prisma/client'
import { Description } from '../domain/role/description'
import { Name } from '../domain/role/name'
import { Role } from '../domain/role/role'

export class RoleMapper {
  static toDomain(raw: PersistenceRole) {
    const nameOrError = Name.create(raw.name)
    const descriptionOrError = Description.create(raw.description)

    if (nameOrError.isLeft()) {
      throw new Error('name value is invalid.')
    }

    if (descriptionOrError.isLeft()) {
      throw new Error('description value is invalid.')
    }

    const roleOrError = Role.create({
      name: nameOrError.value,
      description: descriptionOrError.value
    }, raw.id)

    if (roleOrError.isRight()) {
      return roleOrError.value
    }

    return null
  }

  static async toPersistence(role: Role) {
    return {
      id: role.id,
      name: role.name.value,
      description: role.description.value
    }
  }
}