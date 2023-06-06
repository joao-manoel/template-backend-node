import { Router } from 'express'
import { sessionsRouter } from './user/session.routes'
import { usersRouter } from './user/users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/session', sessionsRouter)

export { router }

