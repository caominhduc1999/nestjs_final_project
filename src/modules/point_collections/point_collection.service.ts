import {Injectable, Req} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { log } from 'console';
import { Request } from 'express';
import { pointCalculate } from 'src/helpers/common.helper';
import { ErrorHelper } from 'src/helpers/error.utils';
import { PointCollectionEntity } from '../../entities';
import { PointCollectionDto } from './dto/point_collection.dto';

@Injectable()
export class PointCollectionService extends BaseService<PointCollectionEntity, PointCollectionDto> {
    constructor(
        @InjectRepository(PointCollectionEntity) private readonly pointCollectionRepository: Repository<PointCollectionEntity>,
    ) {
        super(pointCollectionRepository, PointCollectionDto);
    }

    async getPointsByUserId(userId: string) {
        const pointCollection = await this.pointCollectionRepository.find({
            where: {
                user_id: userId as any
            }
        });

        return pointCollection.reduce((sum, point) => sum + point.point, 0) ?? 0;
    }
}