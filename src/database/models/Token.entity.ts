import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '@model/User.entity'

@Entity('tokens')
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => UserEntity, u => u.tokens)
    user!: UserEntity

    @Column()
    refreshToken!: string

    @Column({ type: 'bigint' })
    lastSignIn!: number

    @Column({ nullable: true })
    ip!: string
}