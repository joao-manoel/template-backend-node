import { Controller } from "@core/infra/Controller"
import { HttpResponse, clientError, conflict, created, fail } from "@core/infra/HttpResponse"
import { RegisterPermission } from "./RegisterPermission"
import { PermissionAlreadyExistsError } from "./errors/permissionAlreadyExistsError"

type RegisterPermissionControllerRequest = {
  name: string
  description: string
}

export class RegisterPermissionController implements Controller {
  constructor(private registerPermission: RegisterPermission) { }
  
  async handle(request: RegisterPermissionControllerRequest): Promise<HttpResponse>{
    try {
      const { name, description } = request 

      const result = await this.registerPermission.execute({
        name, description
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case PermissionAlreadyExistsError:
            return conflict(error)
          default: 
            return clientError(error)
        }
      } else {
        return created()
      }
    } catch (err) {
      return fail(err)
    }
  }
}