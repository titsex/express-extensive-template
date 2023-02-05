import { UserEntity } from '@models'
import { Roles } from '@types'

export class CreateDto {
    email: string
    id: number
    isActivated: boolean
    roles: Roles[]
    createdAt: Date

    constructor(user: UserEntity) {
        this.email = user.email
        this.id = user.id
        this.isActivated = user.isActivated
        this.roles = user.roles
        this.createdAt = user.createdAt
    }
}