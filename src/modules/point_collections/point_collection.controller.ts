import {Body, Controller, Param, Post, Put, Get, Delete, UseGuards, Req} from '@nestjs/common';
import { UserPointDto } from '../users/user_point.dto';
import { ErrorHelper } from 'src/helpers/error.utils';
import { pointCalculate } from 'src/helpers/common.helper';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/user.dto';
import { PointCollectionService } from './point_collection.service';
import { PointCollectionDto } from './point_collection.dto';

@Controller('point-collection')
export class PointCollectionController {
    constructor(
        private readonly userService: UserService,
        protected readonly pointCollectionService: PointCollectionService
    ) {}

    @Post('add-points')
    async addPoint(
        @Body() payload: UserPointDto,
        @Req() request: Request
    ): Promise<PointCollectionDto> {
        const userId: string = request['user']?.id;
        const user: any = await this.userService.findOne(userId);
        
        if (!user) {
            ErrorHelper.NotFoundException('Not found user');
        }
        
        const earnPoint = pointCalculate(user.rank, payload.order_value);
        
        const pointCollection: any = {
            user_id: userId,
            point: earnPoint,
            order_value: payload.order_value
        }
        
        return this.pointCollectionService.save(pointCollection);
    }

    @Get('get-points')
    async getPoints(
        @Req() request: Request
    ): Promise<any> {
        const userId: string = request['user']?.id;
        
        const point = await this.pointCollectionService.getPointsByUserId(userId);
        
        return {
            result: point
        }
    }
}