import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { AdminEntity } from '../../../entities';

@EntityRepository(AdminEntity)
export class AdminRepository extends BaseRepository<AdminEntity> {
  constructor(@InjectRepository(AdminEntity) readonly AdminEntity: Repository<AdminEntity>) {
    super(AdminEntity);
  }
}
