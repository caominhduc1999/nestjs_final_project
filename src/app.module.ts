import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftRedeemEntity } from './entities';
import { GiftEntity } from './entities';
import { PointCollectionEntity } from './entities';
import { Store } from './entities';
import { UserEntity } from './entities';
import { UserModule } from './modules/users/user.module';
import { UserController } from './modules/users/user.controller';
import { StoreModule } from './modules/stores/store.module';
import { GiftModule } from './modules/gifts/gift.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtSharedModule } from './modules/shared/jwt.module';
import { PointCollectionModule } from './modules/point_collections/point_collection.module';
import { GiftRedeemModule } from './modules/gift_redeems/gift_redeem.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { ConfigModule } from '@nestjs/config';
import { IsUniqueConstraint } from './modules/shared/validator/is-unique-constraint';

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
        Store,
        UserEntity
      ],
      synchronize: false,  // migration
    }),
    UserModule,
    StoreModule,
    GiftModule,
    AuthModule,
    JwtSharedModule,
    PointCollectionModule,
    GiftRedeemModule,
    TwilioModule,
    ConfigModule.forRoot({
      isGlobal: true,  // Make the ConfigModule global
    }),
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
