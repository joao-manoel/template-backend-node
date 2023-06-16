import { Middleware } from "@core/infra/Middleware";
import { EnsureAcessControllMiddleware } from "@infra/http/middlewares/EnsureAcessControllMiddleware";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUserRepository";

type makeEnsureAcessControllMiddlewareRequest = {
  roles?: string[]
  permissions?: string[]
}

export function makeEnsureAcessControllMiddleware({ roles, permissions }: makeEnsureAcessControllMiddlewareRequest): Middleware{
  const prismaUserRepository = new PrismaUsersRepository()
  
  const ensureAcessControllMiddleware = new EnsureAcessControllMiddleware(
    prismaUserRepository,
    roles,
    permissions
  )

  return ensureAcessControllMiddleware
}