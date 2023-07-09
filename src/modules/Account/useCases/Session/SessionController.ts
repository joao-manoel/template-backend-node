import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, fail, ok } from "@core/infra/HttpResponse";
import { Session } from "./Session";

type SessionControllerRequest = {
  userId: string
}

export class SessionController implements Controller {
  constructor(private session: Session){}

  async handle(request: SessionControllerRequest): Promise<HttpResponse>{
    try { 
      const { userId } = request
      
      const result = await this.session.execute(userId)

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          default: 
            return clientError(error)
        }
      } else {

        const {username, email, roles} = result.value

        return ok({username, email, roles})
      }
    } catch (err) {
      return fail(err)
    }
  }
}