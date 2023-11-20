import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { StoreRepository } from "../stores/repository/store.repository";
import { AdminEntity, Store } from "../../entities";
import { JwtModule } from "@nestjs/jwt/dist";
import { Response } from "express";
import { UserRepository } from "../users/repository/user.repository";
import { UserEntity } from "../../entities";
import { TwilioService } from "../twilio/twilio.service";
import { UserService } from "../users/user.service";
import { StoreService } from "../stores/store.service";
import { AdminRepository } from "../admins/repository/admin.repository";
import { AdminService } from "../admins/admin.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Store, UserEntity, AdminEntity]),
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        StoreRepository,
        UserRepository,
        AdminRepository,
        TwilioService,
        UserService,
        StoreService,
        AdminService,
        Logger
    ],
    exports: []
})
export class AuthModule {

}