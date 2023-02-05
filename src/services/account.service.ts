import { tokenRepository, userRepository } from '@database'
import { TokenService } from '@service/token.service'
import { Unauthorized } from '@class/Error'
import { RefreshDto } from '@dto/account'
import { CreateDto } from '@dto/auth'

export class AccountService {
    public static async getYourself(refreshToken: string) {
        if (!refreshToken) throw new Error('You were not logged in')

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokensFromDb = await tokenRepository.findBy({ refreshToken: refreshToken })

        if (!userData || !tokensFromDb.length) throw new Unauthorized()

        const user = await userRepository.findOneBy({ id: userData.id })
        if (!user) throw new Error('The user is not in the database')

        return { user, tokensFromDb, userData }
    }

    public static async refresh(data: RefreshDto) {
        const { user } = await this.getYourself(data.refreshToken)

        const userInfo = new CreateDto(user)
        const tokens = TokenService.generateTokens(userInfo)

        await TokenService.saveToken(user, tokens.refreshToken, data.ip)
        return { ...tokens, user: userInfo }
    }

    public static async logout(refreshToken: string) {
        const candidate = await tokenRepository.findOneBy({ refreshToken })
        if (!candidate) throw new Unauthorized()

        return await tokenRepository.delete(candidate.id)
    }
}
