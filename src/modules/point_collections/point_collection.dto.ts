import { Length, IsEmail, IsEnum, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Expose, Transform } from "class-transformer"
import { Rank } from "src/enums/rank.enums";

export class PointCollectionDto {
    @Expose()
    id: number

    @Expose()
    user_id: number

    @Expose()
    point: number

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    order_value: number

    @Expose()
    created_at: Date

    @Expose()
    updated_at: Date
}