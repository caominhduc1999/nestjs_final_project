import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftEntity } from "./gift.entity";
import { GiftController } from "./gift.controller";
import { GiftService } from "./gift.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftEntity])
    ],
    controllers: [GiftController],
    providers: [GiftService]
})
export class GiftModule {

}