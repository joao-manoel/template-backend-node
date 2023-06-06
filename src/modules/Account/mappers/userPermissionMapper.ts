import { User_permission as PersistenceUserPermission } from '@prisma/client';
import { UserPermission } from '../domain/UserPermission/userPermission';

export class UserPermissionMapper {
  static toDomain(raw: PersistenceUserPermission): UserPermission{
    const userPermissionOrError = UserPermission.create({
      permissionId: raw.permissionId,
      userId: raw.userId
    }, raw.id)

    if (userPermissionOrError.isRight()) {
      return userPermissionOrError.value
    }

    return null
  }

  static async toPersistence(userRole: UserPermission) {
    return {
      id: userRole.id,
      userId: userRole.userId,
      permissionId: userRole.permissionId
    }
  }
}