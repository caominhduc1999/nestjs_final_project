import { Module, NestModule, MiddlewareConsumer  } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtSharedModule } from "../shared/jwt.module";
import { UserJwtMiddleware } from "src/common/user.jwt.middleware";
import { GiftRedeemController } from "./gift_redeem.controller";
import { UserService } from "../users/user.service";
import { UserEntity } from "../users/user.entity";
import { GiftEntity } from "../gifts/gift.entity";
import { GiftRedeemService } from "./gift_redeem.service";
import { GiftRedeemRepository } from "./gift_redeem.repository";
import { GiftRedeemEntity } from "./gift_redeem.entity";
import { GiftService } from "../gifts/gift.service";
import { PointCollectionService } from "../point_collections/point_collection.service";
import { PointCollectionEntity } from "../point_collections/point_collection.entity";
import { StoreService } from "../stores/store.service";
import { Store } from "../stores/store.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftRedeemEntity, GiftEntity, UserEntity, PointCollectionEntity, Store]),
        JwtSharedModule
    ],
    controllers: [GiftRedeemController],
    providers: [GiftRedeemService, GiftService, UserService, PointCollectionService, StoreService]
})

export class GiftRedeemModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserJwtMiddleware).forRoutes(GiftRedeemController);
    }
}