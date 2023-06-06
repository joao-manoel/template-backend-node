import { HttpResponse, fail, forbidden, ok } from "@core/infra/HttpResponse";
import { Middleware } from "@core/infra/Middleware";
import { prisma } from "@infra/prisma/client";
import { Request } from "express";
import { AccessDeniedError } from "../errors/AccessDeniedError";


export class EnsureAcessControllMiddleware implements Middleware{

  constructor(private readonly requiredRoles: string[], private readonly requiredPermisson: string[]) { }
  
  async handle({userId}: Request): Promise<HttpResponse>{
    try {

      //Verifique se o usuario possui algum dos cargos requeridos
      const userRoles = await prisma.user_role.findMany({
        where: {
          userId,
          role: {
            name: {in: this.requiredRoles}
          }
        }
      })

      console.log(userRoles)

      //Verifique se o usuario possui alguma das permissoes requeridas
      const userPermissions = await prisma.user_permission.findMany({
        where: {
          userId,
          permission: {
            name: {in: this.requiredPermisson }
          }
        }
      })

      if (userRoles.length >= 1 || userPermissions.length >= 1 ) {
        return ok()
      }
      
      return forbidden(new AccessDeniedError())
      
    } catch (err) {
      return fail(err)
    }
  }
  
}