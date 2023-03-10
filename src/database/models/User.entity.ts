import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TokenEntity } from '@model/Token.entity'
import { Roles } from '@types'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({ default: false })
    isActivated!: boolean

    @Column()
    activationLink?: string

    @CreateDateColumn()
    createdAt!: Date

    @Column('simple-array')
    roles!: Roles[]

    @OneToMany(() => TokenEntity, (t) => t.user)
    tokens?: TokenEntity[]
}
