import { AccountController } from '@controller/account.controller'
import { checkAuth } from '@middleware/checkAuth.middleware'
import { Router } from 'express'

const accountRouter = Router()

accountRouter.get('/', checkAuth, AccountController.getYourself)
accountRouter.get('/refresh', AccountController.refresh)
accountRouter.post('/logout', AccountController.logout)

export default accountRouter
