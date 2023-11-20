import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength  } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}