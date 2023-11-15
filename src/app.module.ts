import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftRedeemEntity } from './gift_redeems/gift_redeem.entity';
import { GiftEntity } from './gifts/gift.entity';
import { PointCollectionEntity } from './point_collections/point_collection.entity';
import { StoreEntity } from './stores/store.entity';
import { UserEntity } from './users/user.entity';
import { UserModule } from './users/user.module';
import { UserController } from './users/user.controller';
import { StoreModule } from './stores/store.module';

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
    StoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
