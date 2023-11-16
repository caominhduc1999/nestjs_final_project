import { IsNumber, IsNotEmpty } from "class-validator";

export class UserPointDto {
    @IsNotEmpty()
    @IsNumber()
    order_value: number
}