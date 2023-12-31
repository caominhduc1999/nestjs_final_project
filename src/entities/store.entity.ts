import { BaseEntity } from "src/base/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
    name: 'stores'
})
export class Store extends BaseEntity {
    @Column()
    name: string

    @Column()
    code: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column({
        type: 'enum',
        enum: [1, 2],    // 1: UNAPPROVED, 2: APPROVED
        default: 1
    })
    is_approved: number

    @OneToMany(() => UserEntity, user => user.store, {
        eager: true
    })
    users: UserEntity[]
}