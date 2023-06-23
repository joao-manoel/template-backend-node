import { DomainError } from "@core/domain/errors/DomainError";

export class RoleNotFoundError extends Error implements DomainError {
  constructor(){
    super(`Role not found.`)
    this.name = 'RoleNotFoundError'
  }
}