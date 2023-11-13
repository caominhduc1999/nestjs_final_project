import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'users'
})
export class UserEntity extends BaseEntity {
    @Column()
    firstName: string

    @Column()
    lastName: string

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
}