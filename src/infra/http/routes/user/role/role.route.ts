import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makePromoteUserController } from '@infra/http/factories/controllers/PromoteUserControllerFactory'
import { makeRegisterRoleController } from '@infra/http/factories/controllers/RegisterRoleControllerFactory'
import { makeEnsureAcessControllMiddleware } from '@infra/http/factories/middlewares/makeEnsureAcessControllMiddleware'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware'
import express from 'express'

const roleRouter = express.Router()
roleRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

roleRouter.post('/',
  adaptMiddleware(makeEnsureAcessControllMiddleware({
    permissions: ['create_roles']
  })),
  adaptRoute(makeRegisterRoleController()))

roleRouter.post('/promote', adaptRoute(makePromoteUserController()))

export { roleRouter }

