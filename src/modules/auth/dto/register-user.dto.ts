import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength  } from 'class-validator';
import { IsUnique } from 'src/modules/shared/validator/is-unique';
import { Match } from 'src/validator/match.decorator';

export class RegisterUserDto {
    id: number

    rank_name: string

    full_name: string

    created_at: Date

    updated_at: Date

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The Email field is required!' })
    @IsUnique({tableName: 'users', column: 'email'})
    email: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The phone field is required!' })
    @IsUnique({tableName: 'users', column: 'phone'})
    phone: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The first name field is required!' })
    first_name: string

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The last name field is required!' })
    last_name: string
}