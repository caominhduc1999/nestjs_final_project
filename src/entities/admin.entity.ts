import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'admins'
})
export class AdminEntity extends BaseEntity {
    @Column()
    email: number

    @Column()
    password: string
}