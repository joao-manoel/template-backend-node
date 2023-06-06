import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { InvalidDescriptionError } from "@modules/Account/errors/InvalidDescriptionError";
import { InvalidNameError } from "@modules/Account/errors/InvalidNameError";
import { Description } from "./description";
import { Name } from "./name";

interface IPermissionProps {
  name: Name
  description: Description
}

export class Permission extends Entity<IPermissionProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  private constructor(props: IPermissionProps, id?: string) {
    super(props, id)
  }

  static create(props: IPermissionProps, id?: string): Either<
      | InvalidDescriptionError
      | InvalidNameError,
      Permission> {
    const permission = new Permission(props, id)
    
    return right(permission)
  }
}