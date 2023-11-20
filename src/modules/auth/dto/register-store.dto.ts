import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength  } from 'class-validator';
import { IsUnique } from 'src/modules/shared/validator/is-unique';
import { Match } from 'src/validator/match.decorator';

export class RegisterStoreDto {
    id: number

    address: string

    created_at: Date

    updated_at: Date

    is_approved: number

    users: object

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The Email field is required!' })
    @IsUnique({tableName: 'stores', column: 'email'})
    email: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The phone field is required!' })
    @IsUnique({tableName: 'stores', column: 'phone'})
    phone: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The name field is required!' })
    name: string

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The password field is required!' })
    password: string

    @MaxLength(255)
    @IsString()
    @IsNotEmpty({ message: 'The confirmation password field is required!' })
    @Match('password')
    confirmation_password: string
}