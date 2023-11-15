import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'users'
})
export class UserEntity extends BaseEntity {
    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column({
        type: 'enum',
        enum: [1, 2, 3],    // 1: BRONZE, 2: SILVER, 3: GOLD
        default: 1
    })
    rank: number

    @Column()
    created_at: Date

    @Column()
    updated_at: Date
}