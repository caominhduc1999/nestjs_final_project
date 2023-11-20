import { Length, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Expose, Transform } from "class-transformer"
import { Rank } from "src/enums/rank.enums";
import { IsUnique } from "../../shared/validator/is-unique";

export class UserDto {
    @Expose()
    id: number

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    // @IsUnique({tableName: 'users', column: 'phone'})
    @Expose()
    phone: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 100)
    @IsEmail()
    @Expose()
    // @IsUnique({tableName: 'users', column: 'email'})
    email: string

    // @IsEnum(Rank)
    @Expose()
    rank: number

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
    rank_name: string

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

    // @Transform(({obj}) => obj.first_name + ' ' + obj.last_name)
    // @Expose()
    // store_name: string

    @Expose()
    created_at: Date

    @Expose()
    updated_at: Date
}