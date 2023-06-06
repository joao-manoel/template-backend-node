import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

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

  static create(props: IUserRoleProps, id?: string): Either<Error, UserRole>{
    const userRole = new UserRole(props, id)

    return right(userRole)
  }
}