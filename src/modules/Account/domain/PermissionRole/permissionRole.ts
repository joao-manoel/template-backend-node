import { Entity } from "@core/domain/Entity"
import { Either, left, right } from "@core/logic/Either"
import { PermissionIdAndRoleIdRequiredError } from "./errors/PermissionIdAndRoleIdRequiredError"

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

  private constructor(props: IPermissionRoleProps) {
    super(props)
  }

  static validate(permissionId: string, roleId: string) {
    if (permissionId === undefined || roleId === undefined) {
      return false
    }

    return true
  }

  static create(props: IPermissionRoleProps, id?: string): Either<Error, PermissionRole>{

    if (!this.validate(props.permissionId, props.roleId)) {
      return left(new PermissionIdAndRoleIdRequiredError())
    }

    const userRole = new PermissionRole(props)

    return right(userRole)
  }
}