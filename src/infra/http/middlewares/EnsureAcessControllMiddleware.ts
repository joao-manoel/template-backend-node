import { HttpResponse, fail, forbidden, ok } from "@core/infra/HttpResponse";
import { Middleware } from "@core/infra/Middleware";
import { IUserRoleRepository } from "@modules/Account/repositories/IUserRoleRepository";
import { Request } from "express";
import { AccessDeniedError } from "../errors/AccessDeniedError";


export class EnsureAcessControllMiddleware implements Middleware{

  constructor(
    private userRoleRepository: IUserRoleRepository,
    private readonly requiredRoles: string[]
  ) { }
  
  async handle({userId}: Request): Promise<HttpResponse>{
    try {

      //Verifique se o usuario possui algum dos cargos requeridos
      const userRoles = await this.userRoleRepository.exists(this.requiredRoles, userId)

      if (userRoles) {
        return ok()
      }
      
      return forbidden(new AccessDeniedError())
      
    } catch (err) {
      return fail(err)
    }
  }
  
}