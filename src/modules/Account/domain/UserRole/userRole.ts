import { Entity } from "@core/domain/Entity";
import { Either, left, right } from "@core/logic/Either";
import { RoleIdAndUserIdRequiredError } from "./errors/RoleIdAndUserIdRequiredError";

interface IUserRoleProps {
  userId: string
  roleId: string
}
export class UserRole extends Entity<IUserRoleProps> {
  get userId() {
    return this.props.userId
  }

  get roleId() {
    return this.props.roleId
  }

  private constructor(props: IUserRoleProps, id?: string) {
    super(props, id)
  }

  static validate(userId: string, roleId: string) {
    if (userId === undefined || roleId === undefined) {
      return false
    }

    return true
  }

  static create(props: IUserRoleProps, id?: string): Either<Error, UserRole>{

    if (!this.validate(props.userId, props.roleId)) {
      return left(new RoleIdAndUserIdRequiredError())
    }

    const userRole = new UserRole(props, id)

    return right(userRole)
  }
}