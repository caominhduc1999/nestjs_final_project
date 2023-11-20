import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "../../entities";
import { AdminRepository } from "./repository/admin.repository";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminEntity])
    ],
    controllers: [AdminController],
    providers: [AdminRepository, AdminService]
})
export class AdminModule {

}