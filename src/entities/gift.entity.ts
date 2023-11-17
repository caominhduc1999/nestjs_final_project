import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'gifts'
})
export class GiftEntity extends BaseEntity {
    @Column()
    point: number

    @Column()
    image: string

    @Column()
    expired_date: Date

    @Column()
    quantity: number

    @Column()
    description: string
}