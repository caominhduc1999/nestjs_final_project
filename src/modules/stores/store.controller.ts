import {Body, Controller, Param, Post, Put, Get, Delete, Query, DefaultValuePipe, ParseIntPipe, Req } from '@nestjs/common';
import { StoreDto } from './store.dto';
import { StoreService } from './store.service';
import { pbkdf2 } from 'src/helpers/crypto.helper';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ErrorHelper } from 'src/helpers/error.utils';
import { Store } from './store.entity';
import { StoreResponseDto } from './storeRespose.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { ApproveDto } from './approve.dto';
import { APPROVED, INAPPROVED } from 'src/constants';

@Controller('stores')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<StoreResponseDto>> {
        limit = limit > 100 ? 100 : limit;
        const result = await this.storeService.paginate({
            page,
            limit,
        });

        // Map Store to StoreResponseDto
        const items = result.items.map((store) => {
            const { password, ...rest } = store;
            return rest;
        });
    
        return {
            ...result,
            items,
        };
    }

    @Post()
    async store(@Body() store: StoreDto): Promise<StoreDto> {
        const newStore: StoreDto = {
            ...store,
            password: await bcrypt.hash(store.password, 12),
            is_approved: INAPPROVED,
            code: Math.floor(100000 + Math.random() * 900000)
        };
        
        return await this.storeService.save(newStore);
    }

    @Post('approve')
    async approve(
        @Body() payload: ApproveDto,
        @Req() request: Request
    ): Promise<{result: string}> {
        const storeId = request['store']?.id;
        const store: any = await this.storeService.findOne(storeId);
        
        if (!store) {
            ErrorHelper.NotFoundException('Not found store');
        }
        
        if (store.code != payload.code) {
            ErrorHelper.BadRequestException('wrong code');
        }

        const updateStore: StoreDto = {
            ...store,
            code: null,
            is_approved: APPROVED
        };
        
        return await this.storeService.update(storeId, updateStore);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() store: StoreDto): Promise<{result: string}> {
        const updateStore: StoreDto = {
            ...store,
            password: await bcrypt.hash(store.password, 12)
        };
        
        return await this.storeService.update(id, updateStore);
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        const store = await this.storeService.findOne(id);
        console.log(store);
        
        
        if (!store) {
            ErrorHelper.BadRequestException('Not found store');
        }

        return store;
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        const store = await this.storeService.findOne(id);
        
        if (!store) {
            ErrorHelper.BadRequestException('Not found store');
        }

        return this.storeService.deleteById(id);
    }
}