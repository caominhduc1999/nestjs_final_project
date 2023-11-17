import {Injectable, Req} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { BaseService } from 'src/base/base.service';
import { log } from 'console';
import { Request } from 'express';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService extends BaseService<UserEntity, UserDto> {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>

    ) {
        super(userRepository, UserDto);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
        const queryBuilder = this.userRepository.createQueryBuilder('c');

        return await paginate<UserEntity>(queryBuilder, options);
    }
}