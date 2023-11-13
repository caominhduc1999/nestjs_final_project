import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date

    @CreateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date

    @Column({
        name: 'deleted_at',
        default: null
    })
    deletedAt: Date
}