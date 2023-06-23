import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class AssignmentPermissionRoleAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`This permission has already been assigned to this role.`)
    this.name = 'AssignmentPermissionRoleAlreadyExistsError'
  }
}