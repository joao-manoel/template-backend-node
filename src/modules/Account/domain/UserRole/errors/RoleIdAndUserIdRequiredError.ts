import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class RoleIdAndUserIdRequiredError extends Error implements UseCaseError {
  constructor() {
    super(`userId and roleId are required.`)
    this.name = 'RoleIdAndUserIdRequiredError'
  }
}