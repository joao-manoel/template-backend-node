import { Permission_role as PersistencePermissionRole } from '@prisma/client';
import { PermissionRole } from '../domain/PermissionRole/permissionRole';



export class PermissionRoleMapper {
  static toDomain(raw: PersistencePermissionRole): PermissionRole{
    const permissionRoleOrError = PermissionRole.create({
      roleId: raw.roleId,
      permissionId: raw.permissionId
    }, raw.id)

    if (permissionRoleOrError.isRight()) {
      return permissionRoleOrError.value
    }

    return null
  }

  static async toPersistence(permissionRole: PermissionRole) {
    return {
      id: permissionRole.id,
      permissionId: permissionRole.permissionId,
      roleId: permissionRole.roleId
    }
  }
}