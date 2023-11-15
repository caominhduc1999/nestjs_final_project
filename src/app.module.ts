import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftRedeemEntity } from './modules/gift_redeems/gift_redeem.entity';
import { GiftEntity } from './modules/gifts/gift.entity';
import { PointCollectionEntity } from './modules/point_collections/point_collection.entity';
import { StoreEntity } from './modules/stores/store.entity';
import { UserEntity } from './modules/users/user.entity';
import { UserModule } from './modules/users/user.module';
import { UserController } from './modules/users/user.controller';
import { StoreModule } from './modules/stores/store.module';
import { GiftModule } from './modules/gifts/gift.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'loyalty_system',
      entities: [
        GiftRedeemEntity,
        GiftEntity,
        PointCollectionEntity,
        StoreEntity,
        UserEntity
      ],
      synchronize: false,  // migration
    }),
    UserModule,
    StoreModule,
    GiftModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
