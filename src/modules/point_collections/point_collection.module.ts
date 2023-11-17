import { Module, NestModule, MiddlewareConsumer  } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtSharedModule } from "../shared/jwt.module";
import { UserJwtMiddleware } from "src/common/user.jwt.middleware";
import { PointCollectionEntity } from "../../entities";
import { PointCollectionController } from "./point_collection.controller";
import { UserService } from "../users/user.service";
import { PointCollectionService } from "./point_collection.service";
import { UserEntity } from "../../entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([PointCollectionEntity, UserEntity]),
        JwtSharedModule
    ],
    controllers: [PointCollectionController],
    providers: [UserService, PointCollectionService]
})

export class PointCollectionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserJwtMiddleware).forRoutes(PointCollectionController);
    }
}