import { Length, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Expose, Transform } from "class-transformer"
import { Rank } from "src/enums/rank.enums";

export class UserDto {
    @Expose()
    id: string

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

    @IsEnum(Rank)
    @Transform(({ value }) => {
        switch (value) {
            case 1:
                return 'BRONZE';
            case 2:
                return 'SILVER';
            case 3:
                return 'GOLD';
            default:
                return 'UNKNOWN';
        }
    })
    @Expose()
    rank: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    @Expose()
    first_name: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    @Expose()
    last_name: string

    @Transform(({obj}) => obj.first_name + ' ' + obj.last_name)
    @Expose()
    full_name: string

    @Expose()
    created_at: Date

    @Expose()
    updated_at: Date
}