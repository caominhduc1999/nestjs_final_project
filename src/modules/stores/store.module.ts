import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "../../entities";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { UserEntity } from "../../entities";
import { JwtSharedModule } from "../shared/jwt.module";
import { JwtMiddleware } from "src/common/jwt.middleware";
import { UserService } from "../users/user.service";
@Module({
    imports: [
        TypeOrmModule.forFeature([Store, UserEntity]),
        JwtSharedModule
    ],
    controllers: [StoreController],
    providers: [StoreService, UserService]
})
export class StoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(StoreController);
    }
}