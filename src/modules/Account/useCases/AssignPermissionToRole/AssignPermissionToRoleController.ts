import { Controller } from "@core/infra/Controller"
import { HttpResponse, clientError, conflict, created, fail, notFound } from "@core/infra/HttpResponse"
import { PermissionNotFoundError } from "@modules/Account/errors/PermissionNotFoundError"
import { RoleNotFoundError } from "@modules/Account/errors/RoleNotFoundError"
import { AssignPermissionToRole } from "./AssignPermissionToRole"
import { AssignmentPermissionRoleAlreadyExistsError } from "./errors/AssignmentPermissionRoleAlreadyExistsError"

type AssignPermissionToRoleRequest = {
  permissionId: string
  roleId: string
}

export class AssignPermissionToRoleController implements Controller {
  constructor(private assignPermissionToRole: AssignPermissionToRole) { }
  
  async handle(request: AssignPermissionToRoleRequest): Promise<HttpResponse> { 
    try {
      const { permissionId, roleId } = request
      
      const result = await this.assignPermissionToRole.execute({
        permissionId,
        roleId
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case AssignmentPermissionRoleAlreadyExistsError:
            return conflict(error)
          case RoleNotFoundError:
          case PermissionNotFoundError:
            return notFound(error)
          default:
            return clientError(error)
        }
      } else {
        return created()
      }
    } catch (err) {
      fail(err)
    }
  }
    
}