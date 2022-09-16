import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    providerId: string

    @Column()
    email: string

    @Column()
    firstName: number

    @Column()
    lastName: string

    @Column()
    grade: number

    @Column()
    class: number

    @Column()
    num: number

    @Column({ default: 0 })
    caution: boolean

    @Column({ default: "" })
    jwt: String
}