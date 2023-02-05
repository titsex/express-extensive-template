import { UserEntity, TokenEntity } from '@models'
import { DataSource, Repository } from 'typeorm'
import { Logger } from '@class/Logger'

export let tokenRepository!: Repository<TokenEntity>
export let userRepository!: Repository<UserEntity>

export class DB {
    constructor(url: string) {
        const connection = new DataSource({
            type: 'postgres',
            url,
            entities: ['build/**/*.entity.js'],
            synchronize: true,
            logger: 'debug',
        })

        connection
            .initialize()
            .then((connect) => {
                tokenRepository = connect.getRepository(TokenEntity)
                userRepository = connect.getRepository(UserEntity)
            })
            .catch(() => Logger.error('An error occurred while connecting to the database.'))

        Logger.info('Successful connection to the database.')
    }
}