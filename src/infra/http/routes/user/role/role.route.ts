import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeAssignPermissionToRoleController } from '@infra/http/factories/controllers/AssignPermissionToRoleControllerFactory'
import { makeRegisterRoleController } from '@infra/http/factories/controllers/RegisterRoleControllerFactory'
import { makeEnsureAcessControllMiddleware } from '@infra/http/factories/middlewares/makeEnsureAcessControllMiddleware'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware'
import express from 'express'

const roleRouter = express.Router()
roleRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

roleRouter.use(adaptMiddleware(makeEnsureAcessControllMiddleware({
    permissions: ['manage_roles']
})))
  
roleRouter.post('/', adaptRoute(makeRegisterRoleController()))

roleRouter.post('/permission', adaptRoute(makeAssignPermissionToRoleController()))

export { roleRouter }

