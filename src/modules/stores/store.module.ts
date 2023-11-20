import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity, Store } from "../../entities";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { UserEntity } from "../../entities";
import { JwtSharedModule } from "../shared/jwt.module";
import { JwtMiddleware } from "src/common/jwt.middleware";
import { UserService } from "../users/user.service";
import { AdminJwtMiddleware } from "src/common/admin.jwt.middleware";
import { AdminService } from "../admins/admin.service";
@Module({
    imports: [
        TypeOrmModule.forFeature([Store, UserEntity, AdminEntity]),
        JwtSharedModule
    ],
    controllers: [StoreController],
    providers: [StoreService, UserService, AdminService]
})
export class StoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AdminJwtMiddleware).forRoutes(
            {method: RequestMethod.GET, path: '/'},
            {method: RequestMethod.POST, path: '/approve'},
            {method: RequestMethod.POST, path: '/'},
            {method: RequestMethod.PUT, path: '/:id'},
            {method: RequestMethod.GET, path: '/:id'},
            {method: RequestMethod.DELETE, path: '/:id'},
        );
        consumer.apply(JwtMiddleware).forRoutes(
            {method: RequestMethod.GET, path: '/store/users'},
        );
        
    }
}