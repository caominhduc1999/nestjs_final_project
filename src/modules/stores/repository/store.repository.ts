import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Store } from '../../../entities';
import { BaseRepository } from 'src/base/base.repository';

@EntityRepository(Store)
export class StoreRepository extends BaseRepository<Store> {
  constructor(@InjectRepository(Store) readonly Store: Repository<Store>) {
    super(Store);
  }
}
