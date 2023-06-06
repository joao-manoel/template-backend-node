import express from 'express'

import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory'
import { permissionsRouter } from './permission/permission.routes'

const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(makeRegisterUserController()))

usersRouter.use('/permissions', permissionsRouter)

export { usersRouter }

