import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength  } from 'class-validator';

export class StoreLoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}