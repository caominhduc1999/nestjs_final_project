import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftEntity } from './gift.entity';
import { Repository } from 'typeorm';
import { GiftDto } from './gift.dto';
import { BaseService } from 'src/base/base.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class GiftService extends BaseService<GiftEntity, GiftDto> {
    constructor(
        @InjectRepository(GiftEntity) private readonly giftRepository: Repository<GiftEntity>
        
    ) {
        super(giftRepository, GiftDto);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<GiftEntity>> {
        const queryBuilder = this.giftRepository.createQueryBuilder('c');
    
        return paginate<GiftEntity>(queryBuilder, options);
      }

}