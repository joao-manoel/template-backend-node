import { DomainError } from "@core/domain/errors/DomainError";

export class UserNotFoundError extends Error implements DomainError {
  constructor(){
    super(`User not found.`)
    this.name = 'UserNotFoundError'
  }
}