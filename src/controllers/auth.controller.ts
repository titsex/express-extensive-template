import { AuthService } from '@service/auth.service'
import { Request, Response } from 'express'
import { getIp } from '@utils'

export class AuthController {
    public static async registration(request: Request, response: Response) {
        const { email, password } = request.body

        const result = await AuthService.registration({ email, password, ip: getIp(request) })

        return response.status(200).json(result)
    }

    public static async activate(request: Request, response: Response) {
        const { email, hex } = request.params

        const userData = await AuthService.activate({
            email: email as string,
            hex: hex as string,
            ip: getIp(request),
        })

        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return response.status(200).json(userData)
    }

    public static async login(request: Request, response: Response) {
        const { email, password } = request.body

        const userData = await AuthService.login({ email, password, ip: getIp(request) })

        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return response.status(200).json(userData)
    }
}
