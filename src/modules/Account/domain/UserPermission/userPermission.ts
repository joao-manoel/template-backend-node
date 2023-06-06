import { Entity } from "@core/domain/Entity"
import { Either, right } from "@core/logic/Either"

interface IUserPermissionProps {
  userId: string
  permissionId: string
}
 
export class UserPermission extends Entity<IUserPermissionProps>{
  get userId() {
    return this.props.userId
  }

  get permissionId() {
    return this.props.permissionId
  }

  private constructor(props: IUserPermissionProps, id?: string) {
    super(props, id)
  }

  static create(props: IUserPermissionProps, id?: string): Either<Error, UserPermission>{
    const userRole = new UserPermission(props, id)

    return right(userRole)
  }
}