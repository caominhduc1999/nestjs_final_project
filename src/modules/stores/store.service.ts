import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../../entities';
import { Repository } from 'typeorm';
import { StoreDto } from './dto/store.dto';
import { BaseService } from 'src/base/base.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserEntity } from '../../entities';
import { UserDto } from '../users/dto/user.dto';
import { mapStoreToDto } from './dto/map_store_to_dto.dto';

@Injectable()
export class StoreService extends BaseService<Store, StoreDto> {
    constructor(
        @InjectRepository(Store) private readonly storeRepository: Repository<Store>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
        super(storeRepository, StoreDto);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Store>> {
        const queryBuilder = this.storeRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

        const result = await paginate<Store>(queryBuilder, options);

        const storesWithUsers = await Promise.all(
            result.items.map(async (store) => {
              const users = await this.userRepository.find({ where: { store_id: store.id } });
              return mapStoreToDto(store, users);
            }),
          );
      
          const modifiedResult = {
            ...result,
            items: storesWithUsers,
          };
      
          return modifiedResult;
      }
}