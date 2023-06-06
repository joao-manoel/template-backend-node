import { Either, left, right } from "@core/logic/Either"
import { InvalidDescriptionError } from "@modules/Account/errors/InvalidDescriptionError"

export class Description {
  private readonly description: string

  get value(): string {
    return this.description
  }

  private constructor(description: string) {
    this.description = description
  }

  static validate(description: string): boolean {
    if (!description || description.trim().length < 2 || description.trim().length > 100) {
      return false
    }

    return true
  }

  static create(description: string): Either<InvalidDescriptionError, Description>{
    if (!this.validate(description)) {
      return left(new InvalidDescriptionError())
    }

    return right(new Description(description))
  }
}