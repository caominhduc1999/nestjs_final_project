import { Module, NestModule, MiddlewareConsumer  } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtSharedModule } from "../shared/jwt.module";
import { UserJwtMiddleware } from "src/common/user.jwt.middleware";
import { TwilioService } from "../twilio/twilio.service";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "./user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtSharedModule
    ],
    controllers: [UserController],
    providers: [UserService, TwilioService, ConfigService, UserRepository]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserJwtMiddleware).forRoutes(UserController);
    }
}