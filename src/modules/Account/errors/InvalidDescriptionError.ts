import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidDescriptionError extends Error implements DomainError {
  constructor(){
    super(`The description is invalid.`)
    this.name = 'InvalidDescriptionError'
  }
}