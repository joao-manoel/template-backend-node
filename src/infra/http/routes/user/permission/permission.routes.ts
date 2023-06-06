import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeRegisterPermissionController } from '@infra/http/factories/controllers/RegisterPermissionControllerFactory'
import express from 'express'

const permissionsRouter = express.Router()

permissionsRouter.post('/', adaptRoute(makeRegisterPermissionController()))

export { permissionsRouter }
