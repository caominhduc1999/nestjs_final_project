import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) readonly UserEntity: Repository<UserEntity>) {
    super(UserEntity);
  }
}
