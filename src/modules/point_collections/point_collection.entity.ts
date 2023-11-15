import { BaseEntity } from "src/base/base.entity";
import { Column, Double, Entity } from "typeorm";

@Entity({
    name: 'point_collections'
})
export class PointCollectionEntity extends BaseEntity {
    @Column()
    user_id: number

    @Column()
    point: number

    @Column()
    order_value: number
}