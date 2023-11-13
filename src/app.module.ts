import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftRedeemEntity } from './gift_redeems/gift_redeem.entity';
import { GiftEntity } from './gifts/gift.entity';
import { PointCollectionEntity } from './point_collections/point_collection.entity';
import { StoreEntity } from './stores/store.entity';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'loyalty_system',
    //   entities: [
    //     GiftRedeemEntity,
    //     GiftEntity,
    //     PointCollectionEntity,
    //     StoreEntity,
    //     UserEntity
    //   ],
    //   synchronize: true,  // migration
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
