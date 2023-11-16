import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./store.entity";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { UserEntity } from "../users/user.entity";
import { JwtSharedModule } from "../shared/jwt.module";
import { JwtMiddleware } from "src/common/jwt.middleware";
@Module({
    imports: [
        TypeOrmModule.forFeature([Store, UserEntity]),
        JwtSharedModule
    ],
    controllers: [StoreController],
    providers: [StoreService]
})
export class StoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(StoreController);
    }
}