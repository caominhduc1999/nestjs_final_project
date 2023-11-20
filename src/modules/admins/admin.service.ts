import {Injectable, Req} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../../entities';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService extends BaseService<AdminEntity, AdminDto> {
    constructor(
        @InjectRepository(AdminEntity) private readonly adminRepository: Repository<AdminEntity>
    ) {
        super(adminRepository, AdminDto);
    }
}