import express from 'express'

import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory'
import { permissionsRouter } from './permission/permission.routes'
import { roleRouter } from './role/role.route'

const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(makeRegisterUserController()))
usersRouter.use('/permissions/', permissionsRouter)
usersRouter.use('/roles', roleRouter)

export { usersRouter }

