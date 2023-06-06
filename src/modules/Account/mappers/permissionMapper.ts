import { Permission as PersistencePermission } from '@prisma/client'
import { Description } from '../domain/permission/description'
import { Name } from '../domain/permission/name'
import { Permission } from '../domain/permission/permission'

export class PermissionMapper {
  static toDomain(raw: PersistencePermission) {
    const nameOrError = Name.create(raw.name)
    const descriptionOrError = Description.create(raw.description)

    if (nameOrError.isLeft()) {
      throw new Error('name value is invalid.')
    }

    if (descriptionOrError.isLeft()) {
      throw new Error('description value is invalid.')
    }

    const permissionOrError = Permission.create({
      name: nameOrError.value,
      description: descriptionOrError.value
    }, raw.id)

    if (permissionOrError.isRight()) {
      return permissionOrError.value
    }

    return null
  }

  static async toPersistence(permission: Permission) {
    return {
      id: permission.id,
      name: permission.name.value,
      description: permission.description.value
    }
  }
}