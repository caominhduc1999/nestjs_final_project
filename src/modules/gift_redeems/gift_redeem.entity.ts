import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'gift_redeems'
})
export class GiftRedeemEntity extends BaseEntity {
    @Column()
    store_id: number

    @Column()
    user_id: number

    @Column()
    gift_id: number

    @Column()
    point: number
}