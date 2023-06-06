import { Middleware } from "@core/infra/Middleware";
import { EnsureAcessControllMiddleware } from "@infra/http/middlewares/EnsureAcessControllMiddleware";

type makeEnsureAcessControllMiddlewareRequest = {
  Roles?: string[]
  Permissions?: string[]
}

export function makeEnsureAcessControllMiddleware({Roles, Permissions}: makeEnsureAcessControllMiddlewareRequest): Middleware{
  const ensureAcessControllMiddleware = new EnsureAcessControllMiddleware(Roles, Permissions)

  return ensureAcessControllMiddleware
}