import { Controller } from "@core/infra/Controller";
import { HttpResponse, fail, ok } from "@core/infra/HttpResponse";
import { GetAllUsers } from "./GetAllUsers";

type ListUsersControllerRequest = {
  skip: number
  take: number
}

export class GetAllUsersController implements Controller {

  constructor(
    private getAllUsers: GetAllUsers
  ){}

  async handle(request: ListUsersControllerRequest): Promise<HttpResponse>{
    try {
      const {skip, take} = request

      const result = await this.getAllUsers.execute({skip, take })

      return ok({data: result})


    } catch (err) {
      return fail(err)
    }
  }

}