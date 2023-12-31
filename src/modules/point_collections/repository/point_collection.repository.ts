import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { PointCollectionEntity } from '../../../entities';

@EntityRepository(PointCollectionEntity)
export class PointCollectionRepository extends BaseRepository<PointCollectionEntity> {
  constructor(@InjectRepository(PointCollectionEntity) readonly PointCollectionEntity: Repository<PointCollectionEntity>) {
    super(PointCollectionEntity);
  }
}
