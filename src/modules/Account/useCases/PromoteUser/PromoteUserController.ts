import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, conflict, created, fail, notFound, ok } from "@core/infra/HttpResponse";
import { RoleNotFoundError } from "@modules/Account/errors/RoleNotFoundError";
import { UserNotFoundError } from "@modules/Account/errors/UserNotFoundError";
import { PromoteUser } from "./PromoteUser";
import { AssignmentRoleUserAlreadyExistsError } from "./errors/AssignmentRoleUserAlreadyExistsError";


type PromoteUserRequest = {
  targetUserId: string
  roleId: string
}

export class PromoteUserController implements Controller{

  constructor(private promoteUser: PromoteUser){}

  async handle(request: PromoteUserRequest): Promise<HttpResponse> {
    try {
      const { targetUserId, roleId } = request

      console.log(request)
      
      const result = await this.promoteUser.execute({
        userId: targetUserId,
        roleId,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case AssignmentRoleUserAlreadyExistsError:
            return conflict(error)
          case UserNotFoundError:
          case RoleNotFoundError:
            return notFound(error)
          default:
            return clientError(error)
        }
      } else {
        return created()
      }

      return ok()
    } catch (err) {
      return fail(err)
    }
  }
}