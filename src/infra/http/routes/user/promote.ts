import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makePromoteUserController } from '@infra/http/factories/controllers/PromoteUserControllerFactory'
import { makeEnsureAcessControllMiddleware } from '@infra/http/factories/middlewares/makeEnsureAcessControllMiddleware'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware'
import express from 'express'

const promoteRouter = express.Router()

promoteRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

promoteRouter.post('/',
  adaptMiddleware(makeEnsureAcessControllMiddleware({
    permissions: ['promote_users']
  })),  
  adaptRoute(makePromoteUserController())
)

export { promoteRouter }

