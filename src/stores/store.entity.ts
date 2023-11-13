import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'stores'
})
export class StoreEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    code: string

    @Column()
    email: string

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
}