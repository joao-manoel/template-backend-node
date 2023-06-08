import { Middleware } from "@core/infra/Middleware";
import { EnsureAcessControllMiddleware } from "@infra/http/middlewares/EnsureAcessControllMiddleware";
import { PrismaUserRoleRepository } from "@modules/Account/repositories/prisma/PrismaUserRoleRepository";


export function makeEnsureAcessControllMiddleware(roles: string[]): Middleware{
  const prismaUserRoleRepository = new PrismaUserRoleRepository()
  
  const ensureAcessControllMiddleware = new EnsureAcessControllMiddleware(
    prismaUserRoleRepository,
    roles,
  )

  return ensureAcessControllMiddleware
}