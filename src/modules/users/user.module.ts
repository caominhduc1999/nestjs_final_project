import { Module, NestModule, MiddlewareConsumer  } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtSharedModule } from "../shared/jwt.module";
import { JwtMiddleware } from "src/common/jwt.middleware";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtSharedModule
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(UserController);
    }
}