import { AccountService } from '@service/account.service'
import { Response } from 'express'
import { IRequest } from '@types'
import { getIp } from '@utils'

export class AccountController {
    public static async getYourself(request: IRequest, response: Response) {
        const { refreshToken } = request.cookies

        const { userData } = await AccountService.getYourself(refreshToken)

        return response.status(200).json(userData)
    }

    public static async refresh(request: IRequest, response: Response) {
        const { refreshToken } = request.cookies

        const userData = await AccountService.refresh({ refreshToken, ip: getIp(request) })

        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return response.status(200).json(userData)
    }

    public static async logout(request: IRequest, response: Response) {
        await AccountService.logout(request.cookies['refreshToken'])

        request.user = undefined
        response.clearCookie('refreshToken')

        return response.status(200).json({ message: 'You have successfully logged out' })
    }
}
