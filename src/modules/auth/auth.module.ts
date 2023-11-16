import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { StoreRepository } from "../stores/store.repository";
import { Store } from "../stores/store.entity";
import { JwtModule } from "@nestjs/jwt/dist";
import { Response } from "express";

@Module({
    imports: [
        TypeOrmModule.forFeature([Store]),
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, StoreRepository],
    exports: []
})
export class AuthModule {

}