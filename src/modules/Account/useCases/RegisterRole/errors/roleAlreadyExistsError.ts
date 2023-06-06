import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class RoleAlreadyExistsError extends Error implements UseCaseError {
  constructor(name: string) {
    super(`There is already a role created with the name '${name}'.`)
    this.name = 'RoleAlreadyExistsError'
  }
}