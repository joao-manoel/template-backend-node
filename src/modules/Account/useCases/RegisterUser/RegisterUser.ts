import { Either, left, right } from "@core/logic/Either";
import { Email } from "@modules/Account/domain/user/email";
import { InvalidEmailError } from "@modules/Account/domain/user/errors/InvalidEmailError";
import { InvalidPasswordLengthError } from "@modules/Account/domain/user/errors/InvalidPasswordLengthError";
import { InvalidUsernameError } from "@modules/Account/domain/user/errors/InvalidUsernameError";
import { Password } from "@modules/Account/domain/user/password";
import { User } from "@modules/Account/domain/user/user";
import { Username } from "@modules/Account/domain/user/username";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";
import { AccountAlreadyExistsError } from "./errors/AccountAlreadyExistsError";


type RegisterUserResponse = Either<
  | AccountAlreadyExistsError
  | InvalidUsernameError
  | InvalidEmailError
  | InvalidPasswordLengthError,
  User>

export class RegisterUser {
  constructor(private usersRepository: IUserRepository) { }
  
  async execute({ username, email, password }): Promise<RegisterUserResponse> {
    const usernameOrError = Username.create(username)
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password, false)

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const userOrError = User.create({
      username: usernameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    const userAlreadyExists = await this.usersRepository.exists(user.email.value)

    if(userAlreadyExists){
      return left(new AccountAlreadyExistsError(user.email.value))
    }

    await this.usersRepository.create(user)

    return right(user)
  }
}