import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class PermissionAlreadyExistsError extends Error implements UseCaseError {
  constructor(name: string) {
    super(`There is already a permission created with the name '${name}'.`)
    this.name = 'PermissionAlreadyExistsError'
  }
}