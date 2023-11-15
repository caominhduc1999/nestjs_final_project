import { Length, IsEmail, IsEnum, IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";
import { Expose, Transform } from "class-transformer"

export class GiftDto {
    @Expose()
    id: string

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    point: number

    @Expose()
    image: string

    @Expose()
    expired_date: string

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    quantity: number

    @Expose()
    description: string
}