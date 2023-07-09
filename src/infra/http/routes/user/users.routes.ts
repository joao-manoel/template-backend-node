import express from 'express'

import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeGetUsersController } from '@infra/http/factories/controllers/GetUsersControllerFactory'
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory'
import { permissionsRouter } from './permission/permission.routes'
import { promoteRouter } from './promote'
import { roleRouter } from './role/role.route'

const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(makeRegisterUserController()))
usersRouter.get('/', adaptRoute(makeGetUsersController()))

usersRouter.use('/permissions/', permissionsRouter)
usersRouter.use('/roles', roleRouter)
usersRouter.use('/promote', promoteRouter)


export { usersRouter }

