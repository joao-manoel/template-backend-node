import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { InvalidDescriptionError } from "@modules/Account/errors/InvalidDescriptionError";
import { InvalidNameError } from "@modules/Account/errors/InvalidNameError";
import { Description } from "./description";
import { Name } from "./name";

interface IRoleProps {
  name: Name
  description: Description
}

export class Role extends Entity<IRoleProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  private constructor(props: IRoleProps, id?: string) {
    super(props, id)
  }

  static create(props: IRoleProps, id?: string): Either<
      | InvalidDescriptionError
      | InvalidNameError,
      Role> {
    const role = new Role(props, id)
    
    return right(role)
  }
}