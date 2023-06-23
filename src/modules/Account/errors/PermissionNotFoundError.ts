import { DomainError } from "@core/domain/errors/DomainError";

export class PermissionNotFoundError extends Error implements DomainError {
  constructor(){
    super(`Permission not found.`)
    this.name = 'PermissionNotFoundError'
  }
}