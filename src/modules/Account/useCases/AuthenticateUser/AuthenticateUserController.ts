import { Controller } from "@core/infra/Controller"
import { HttpResponse, clientError, fail, ok } from "@core/infra/HttpResponse"
import { AuthenticateUser } from "./AuthenticateUser"

type AuthenticateUserControllerRequest = {
  email: string
  password: string
}

export class AuthenticateUserController implements Controller {

  constructor(private authenticateUser: AuthenticateUser){}

  async handle({email, password}: AuthenticateUserControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.authenticateUser.execute({
        email, password
      })

      if (result.isLeft()) {
        const error = result.value

        return clientError(error)
      } else {
        const { username, roles, token } = result.value
        
        return ok({username, roles, token})
      }
    } catch (err) {
      return fail(err)
    }
  }

}