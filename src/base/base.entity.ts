import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({
        name: 'created_at'
    })
    created_at: Date

    @CreateDateColumn({
        name: 'updated_at'
    })
    updated_at: Date
}