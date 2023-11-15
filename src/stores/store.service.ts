import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { Repository } from 'typeorm';
import { StoreDto } from './store.dto';
import { BaseService } from 'src/base/base.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class StoreService extends BaseService<StoreEntity, StoreDto> {
    constructor(
        @InjectRepository(StoreEntity) private readonly storeRepository: Repository<StoreEntity>
        
    ) {
        super(storeRepository, StoreDto);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<StoreEntity>> {
        const queryBuilder = this.storeRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do
    
        return paginate<StoreEntity>(queryBuilder, options);
      }

}