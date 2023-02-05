import { rateLimiterMiddleware } from '@middleware/limiter.middleware'
import { Router } from 'express'

import accountRouter from '@route/account.route'
import authRouter from '@route/auth.route'

const router = Router()

router.use('/account', rateLimiterMiddleware, accountRouter)
router.use('/auth', rateLimiterMiddleware, authRouter)

export default router
