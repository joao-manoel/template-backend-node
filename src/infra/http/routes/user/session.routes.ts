import express from 'express'

import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeAuthenticateUserController } from '@infra/http/factories/controllers/AuthenticateUserControllerFactory'
import { makeSessionController } from '@infra/http/factories/controllers/SessionControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware'

const sessionsRouter = express.Router()

sessionsRouter.post('/', adaptRoute(makeAuthenticateUserController()))

sessionsRouter.get('/',
  adaptMiddleware((makeEnsureAuthenticatedMiddleware())),
  adaptRoute(makeSessionController())
)

export { sessionsRouter }

