import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidNameError extends Error implements DomainError {
  constructor(name: string){
    super(`the name "${name}" cannot contain spaces and must be lower case`)
    this.name = 'InvalidNameError'
  }
}