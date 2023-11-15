import {Body, Controller, Param, Post, Put, Get, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { StoreDto } from './store.dto';
import { StoreService } from './store.service';
import { pbkdf2 } from 'src/helpers/crypto.helper';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ErrorHelper } from 'src/helpers/error.utils';
import { StoreEntity } from './store.entity';
import { StoreResponseDto } from './storeRespose.dto';

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
    
        // Map StoreEntity to StoreResponseDto
        const items = result.items.map((storeEntity) => {
            const { password, ...rest } = storeEntity;
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
            password: await pbkdf2(store.password)
        };
        
        return await this.storeService.save(newStore);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() store: StoreDto): Promise<{result: string}> {
        const updateStore: StoreDto = {
            ...store,
            password: await pbkdf2(store.password)
        };
        
        return await this.storeService.update(id, updateStore);
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        const store = await this.storeService.findOne(id);
        
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