import {
    Body, 
    Controller, 
    Param, 
    Post, 
    Put, 
    Get, 
    Delete,
    Query, 
    DefaultValuePipe, 
    ParseIntPipe, 
    UseInterceptors,
    UploadedFile,
    Req
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GiftDto } from './gift.dto';
import { GiftService } from './gift.service';
import { pbkdf2 } from 'src/helpers/crypto.helper';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ErrorHelper } from 'src/helpers/error.utils';
import { GiftEntity } from './gift.entity';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Request } from 'express';

export const storage = {
    storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })
}

@Controller('gifts')
export class GiftController {
    constructor(private readonly giftService: GiftService) {}

    @Get()
    async index(
        @Req() req: Request,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
      ): Promise<Pagination<GiftEntity>> {
        limit = limit > 100 ? 100 : limit;
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const route = `${baseUrl}/gifts`;

        return this.giftService.paginate({
          page,
          limit,
          route,
        });
    }

    @Post()
    async gift(@Body() gift: GiftDto): Promise<GiftDto> {
        return await this.giftService.save(gift);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() gift: GiftDto): Promise<{result: string}> {
        return await this.giftService.update(id, gift);
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        const gift = await this.giftService.findOne(id);
        
        if (!gift) {
            ErrorHelper.BadRequestException('Not found gift');
        }

        return gift;
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        const gift = await this.giftService.findOne(id);
        
        if (!gift) {
            ErrorHelper.BadRequestException('Not found gift');
        }

        return this.giftService.deleteById(id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file): object {
        return {
            imagePath: file.path
        }
    }
}