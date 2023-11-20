import { Module, NestModule, MiddlewareConsumer  } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity, UserEntity } from "../../entities";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtSharedModule } from "../shared/jwt.module";
import { UserJwtMiddleware } from "src/common/user.jwt.middleware";
import { TwilioService } from "../twilio/twilio.service";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "./repository/user.repository";
import { AdminJwtMiddleware } from "src/common/admin.jwt.middleware";
import { AdminService } from "../admins/admin.service";
import { AdminRepository } from "../admins/repository/admin.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, AdminEntity]),
        JwtSharedModule
    ],
    controllers: [UserController],
    providers: [UserService, TwilioService, ConfigService, UserRepository, AdminService, AdminRepository]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AdminJwtMiddleware).forRoutes(UserController);
    }
}