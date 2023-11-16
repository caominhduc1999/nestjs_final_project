import {Injectable, Req} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { BaseService } from 'src/base/base.service';
import { log } from 'console';
import { Request } from 'express';

@Injectable()
export class UserService extends BaseService<UserEntity, UserDto> {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>

    ) {
        super(userRepository, UserDto);
    }
}