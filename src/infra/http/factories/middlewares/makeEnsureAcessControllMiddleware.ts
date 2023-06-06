import { Middleware } from "@core/infra/Middleware";
import { EnsureAcessControllMiddleware } from "@infra/http/middlewares/EnsureAcessControllMiddleware";
import { PrismaUserPermissionRepository } from "@modules/Account/repositories/prisma/PrismaUserPermissionRepository";
import { PrismaUserRoleRepository } from "@modules/Account/repositories/prisma/PrismaUserRoleRepository";

type makeEnsureAcessControllMiddlewareRequest = {
  roles?: string[]
  permissions?: string[]
}

export function makeEnsureAcessControllMiddleware({ roles, permissions }: makeEnsureAcessControllMiddlewareRequest): Middleware{
  const prismaUserRoleRepository = new PrismaUserRoleRepository()
  const prismaUserPermissionRepository = new PrismaUserPermissionRepository()
  const ensureAcessControllMiddleware = new EnsureAcessControllMiddleware(
    prismaUserRoleRepository,
    prismaUserPermissionRepository,
    roles,
    permissions
  )

  return ensureAcessControllMiddleware
}