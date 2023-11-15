import { Expose, Transform } from "class-transformer";

export class BaseDto {
    @Expose()
    id: string;
}