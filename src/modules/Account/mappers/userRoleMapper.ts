import { RoleUser as PersistenceUserRole } from '@prisma/client';
import { UserRole } from "../domain/UserRole/userRole";



export class UserRoleMapper {
  static toDomain(raw: PersistenceUserRole): UserRole{
    const userRoleOrError = UserRole.create({
      roleId: raw.roleId,
      userId: raw.userId
    })

    if (userRoleOrError.isRight()) {
      return userRoleOrError.value
    }

    return null
  }

  static async toPersistence(userRole: UserRole) {
    return {
      userId: userRole.userId,
      roleId: userRole.roleId
    }
  }
}