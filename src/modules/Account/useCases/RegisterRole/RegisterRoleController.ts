import { Controller } from "@core/infra/Controller"
import { HttpResponse, clientError, conflict, created, fail } from "@core/infra/HttpResponse"
import { RegisterRole } from "./RegisterRole"
import { RoleAlreadyExistsError } from "./errors/roleAlreadyExistsError"

type RegisterRoleControllerRequest = {
  name: string
  description: string
}

export class RegisterRoleController implements Controller {
  constructor(private registerRole: RegisterRole) { }
  
  async handle(request: RegisterRoleControllerRequest): Promise<HttpResponse>{
    try {
      const { name, description } = request 

      const result = await this.registerRole.execute({
        name, description
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case RoleAlreadyExistsError:
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