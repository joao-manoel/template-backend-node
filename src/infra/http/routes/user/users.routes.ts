import express from 'express'

import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeGetUsersController } from '@infra/http/factories/controllers/GetUsersControllerFactory'
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory'
import { makeEnsureAcessControllMiddleware } from '@infra/http/factories/middlewares/makeEnsureAcessControllMiddleware'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware'
import { permissionsRouter } from './permission/permission.routes'
import { promoteRouter } from './promote'
import { roleRouter } from './role/role.route'

const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(makeRegisterUserController()))

usersRouter.get('/',
  adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
  adaptMiddleware(makeEnsureAcessControllMiddleware({
    permissions: ['view_users']
  })), adaptRoute(makeGetUsersController()))

usersRouter.use('/permissions/', permissionsRouter)
usersRouter.use('/roles', roleRouter)
usersRouter.use('/promote', promoteRouter)


export { usersRouter }

