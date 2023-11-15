import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreEntity } from "./store.entity";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([StoreEntity])
    ],
    controllers: [StoreController],
    providers: [StoreService]
})
export class StoreModule {

}