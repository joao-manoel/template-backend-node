import { Router } from 'express'
import { usersRouter } from './user/users.routes'

const router = Router()

router.use('/users', usersRouter)

export { router }

