import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'stores'
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
    gift_description: string
}