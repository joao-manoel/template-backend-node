import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class AssignmentRoleUserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`Role already assigned to this user.`)
    this.name = 'AssignmentRoleUserAlreadyExistsError'
  }
}