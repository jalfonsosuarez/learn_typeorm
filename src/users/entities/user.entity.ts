import { number } from 'joi'
import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class User {
    
    @PrimaryGeneratedColumn({type: 'integer'})
    id: number

    @Column({type: 'varchar', length: 20, unique: true})
    username: string

    @Column({type: 'varchar', length: 50, unique: true})
    email: string

    @Column({type: 'varchar'})
    password: string

    @Column({type: 'varchar'})
    name: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updateAt: string
}
