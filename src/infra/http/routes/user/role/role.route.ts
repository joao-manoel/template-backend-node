import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeRegisterRoleController } from '@infra/http/factories/controllers/RegisterRoleControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware'
import express from 'express'

const roleRouter = express.Router()
roleRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

roleRouter.post('/', adaptRoute(makeRegisterRoleController()))

export { roleRouter }

