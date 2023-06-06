import { Entity } from "@core/domain/Entity"
import { Either, right } from "@core/logic/Either"

interface IPermissionRoleProps {
  roleId: string
  permissionId: string
}
 
export class PermissionRole extends Entity<IPermissionRoleProps>{
  get roleId() {
    return this.props.roleId
  }

  get permissionId() {
    return this.props.permissionId
  }

  private constructor(props: IPermissionRoleProps, id?: string) {
    super(props, id)
  }

  static create(props: IPermissionRoleProps, id?: string): Either<Error, PermissionRole>{
    const userRole = new PermissionRole(props, id)

    return right(userRole)
  }
}