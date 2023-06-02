import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory'
import express from 'express'

const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(makeRegisterUserController()))

export { usersRouter }

