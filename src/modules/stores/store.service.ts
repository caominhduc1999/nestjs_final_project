import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { StoreDto } from './store.dto';
import { BaseService } from 'src/base/base.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class StoreService extends BaseService<Store, StoreDto> {
    constructor(
        @InjectRepository(Store) private readonly storeRepository: Repository<Store>
        
    ) {
        super(storeRepository, StoreDto);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Store>> {
        const queryBuilder = this.storeRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do
    
        return paginate<Store>(queryBuilder, options);
      }

}