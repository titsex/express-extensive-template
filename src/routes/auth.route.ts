import { AuthController } from '@controller/auth.controller'
import { AuthValidation } from '@validation/auth.validation'
import { Router } from 'express'

const authRoute = Router()

authRoute.post('/registration', AuthValidation.registration, AuthController.registration)
authRoute.get('/activate/:email/:hex', AuthValidation.activate, AuthController.activate)
authRoute.post('/login', AuthValidation.login, AuthController.login)

export default authRoute
