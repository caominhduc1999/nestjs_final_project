import {Body, Controller, Param, Post, Put, Get, Delete, UseGuards, Req, Res} from '@nestjs/common';
import { UserPointDto } from '../users/user_point.dto';
import { ErrorHelper } from 'src/helpers/error.utils';
import { pointCalculate } from 'src/helpers/common.helper';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/dto/user.dto';
import { GiftRedeemService } from './gift_redeem.service';
import { GiftService } from '../gifts/gift.service';
import { PointCollectionService } from '../point_collections/point_collection.service';
import { StoreService } from '../stores/store.service';

@Controller('gift-redeems')
export class GiftRedeemController {
    constructor(
        private readonly giftRedeemService: GiftRedeemService,
        private readonly giftService: GiftService,
        private readonly userService: UserService,
        private readonly pointCollectionService: PointCollectionService,
        private readonly storeService: StoreService
    ) {}

    @Post()
    async redeemGift(
        @Body('gift_id') giftId: string,
        @Body('store_id') storeId: string,
        @Req() request: Request
    ) {
        const gift = await this.giftService.findOne(giftId);

        if (!gift) {
            ErrorHelper.NotFoundException('Not found gift');
        }

        if (gift.quantity == 0) {
            ErrorHelper.BadRequestException('Gift was out of stock');
        }

        const store = await this.storeService.findOne(storeId);

        if (!store) {
            ErrorHelper.NotFoundException('Not found store');
        }
        
        const userId: string = request['user']?.id;
        const user = await this.userService.findOne(userId);

        if (!user) {
            ErrorHelper.NotFoundException('Not found user');
        }

        const userEarnedPoint = await this.pointCollectionService.getPointsByUserId(userId);
        const userPaidPoint = await this.giftRedeemService.getPaidPointByUserId(userId);
        const remainPoint = userEarnedPoint - userPaidPoint;
        
        if (gift.point > remainPoint) {
            ErrorHelper.BadRequestException('Not enough point');
        }

        const newGiftRedeem: any = {
            store_id: storeId,
            gift_id: giftId,
            user_id: userId,
            point: gift.point
        }

        return this.giftRedeemService.save(newGiftRedeem);
    }
}