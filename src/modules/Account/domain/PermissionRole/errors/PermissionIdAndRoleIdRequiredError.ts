import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class PermissionIdAndRoleIdRequiredError extends Error implements UseCaseError {
  constructor() {
    super(`permissionId and roleId are required.`)
    this.name = 'PermissionIdAndRoleIdRequiredError'
  }
}