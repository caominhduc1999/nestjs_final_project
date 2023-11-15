import { Length, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Expose, Transform } from "class-transformer"
import { Rank } from "src/enums/rank.enums";

export class StoreDto {
    @Expose()
    id: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    @Expose()
    name: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    @Expose()
    phone: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    @IsEmail()
    @Expose()
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    password: string

    @Expose()
    address: string

    @Expose()
    created_at: Date

    @Expose()
    updated_at: Date
}