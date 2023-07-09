import { Permission, PermissionRole, Role, RoleUser, User } from "@prisma/client";
import { UserWithRoleAndPermission } from "../dtos/UserWithRoleAndPermission";

type PersistenceRaw = User &{
  roles: (RoleUser & {
    role: (Role & {
      permissions: (PermissionRole & {
        permission: Permission
      })[]
    })
  })[]
}
export class UserWithRoleAndPermissionMapper {
  static toDto(raw: PersistenceRaw): UserWithRoleAndPermission {
    return {
      username: raw.username,
      email: raw.email,
      password: raw.password,
      roles: raw.roles.map(role => {
        return {
          name: role.role.name,
          description: role.role.description,
          permissions: role.role.permissions.map(permission => {
            return {
              name: permission.permission.name,
              description: permission.permission.description
            }
          })
        }
      })
    }
  }
}