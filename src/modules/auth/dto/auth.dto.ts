import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

class AuthBaseDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The Email field is required!' })
    email: string;
}
