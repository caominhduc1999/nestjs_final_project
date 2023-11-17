import { Length, IsEmail, IsEnum, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Expose, Transform } from "class-transformer"
import { Rank } from "src/enums/rank.enums";

export class GiftRedeemDto {
    @Expose()
    id: number

    @Expose()
    user_id: number

    @Expose()
    store_id: number

    @Expose()
    gift_id: number

    @Expose()
    created_at: Date

    @Expose()
    updated_at: Date
}