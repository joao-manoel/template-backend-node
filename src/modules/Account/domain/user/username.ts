import { Either, left, right } from "@core/logic/Either"
import { InvalidUsernameError } from "./errors/InvalidUsernameError"

export class Username {
  private readonly username: string

  get value(): string {
    return this.username
  }

  private constructor(username: string) {
    this.username = username
  }

  static validate(username: string): boolean {
    if (!username || username.trim().length < 2 || username.trim().length > 32) {
      return false
    }

    return true
  }

  static create(username: string): Either<InvalidUsernameError, Username>{
    if (!this.validate(username)) {
      return left(new InvalidUsernameError(username))
    }

    return right(new Username(username))
  }
}