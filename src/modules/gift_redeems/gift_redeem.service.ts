import {Injectable, Req} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { log } from 'console';
import { Request } from 'express';
import { pointCalculate } from 'src/helpers/common.helper';
import { ErrorHelper } from 'src/helpers/error.utils';
import { GiftRedeemDto } from './dto/gift_redeem.dto';
import { GiftRedeemEntity } from '../../entities';

@Injectable()
export class GiftRedeemService extends BaseService<GiftRedeemEntity, GiftRedeemDto> {
    constructor(
        @InjectRepository(GiftRedeemEntity) private readonly giftRedeemRepository: Repository<GiftRedeemEntity>,
    ) {
        super(giftRedeemRepository, GiftRedeemDto);
    }

    async getPaidPointByUserId(userId: string) {
        const paidPoint = await this.giftRedeemRepository.find({
            where: {
                user_id: userId as any
            }
        });

        return paidPoint.reduce((sum, point) => sum + point.point, 0) ?? 0;
    }
}