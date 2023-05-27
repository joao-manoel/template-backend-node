import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

import { Email } from "./email";
import { Password } from "./password";
import { Username } from "./username";

import { InvalidEmailError } from "./errors/InvalidEmailError";
import { InvalidPasswordLengthError } from "./errors/InvalidPasswordLengthError";
import { InvalidUsernameError } from "./errors/InvalidUsernameError";

interface IUserProps {
  username: Username
  email: Email
  password: Password
}

export class User extends Entity<IUserProps>{
  get username() {
    return this.props.username
  }
  
  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  static create(
    props: IUserProps, id?: string
  ): Either<
    InvalidUsernameError |
    InvalidEmailError |
    InvalidPasswordLengthError,
    User
  > {
    const user = new User(props, id)

    return right(user)
  }
}