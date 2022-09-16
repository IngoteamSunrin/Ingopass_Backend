import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    providerId: number

    @Column()
    email: string

    @Column()
    firstName: number

    @Column()
    lastName: string

    @Column()
    grade: Number

    @Column()
    class: Number

    @Column()
    num: Number

    @Column({ default: 0 })
    caution: boolean

    @Column({ default: "" })
    jwt: String
}