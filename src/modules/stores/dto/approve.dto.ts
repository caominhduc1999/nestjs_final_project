import { Length, IsEmail, IsEnum, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ApproveDto {
    @IsNotEmpty()
    @IsNumber()
    code: number
}