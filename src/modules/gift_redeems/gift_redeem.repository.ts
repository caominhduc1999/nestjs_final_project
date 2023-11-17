import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { GiftRedeemEntity } from './gift_redeem.entity';

@EntityRepository(GiftRedeemEntity)
export class GiftRedeemRepository extends BaseRepository<GiftRedeemEntity> {
  constructor(@InjectRepository(GiftRedeemEntity) readonly GiftRedeemEntity: Repository<GiftRedeemEntity>) {
    super(GiftRedeemEntity);
  }
}
