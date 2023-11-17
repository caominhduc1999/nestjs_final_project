import {Body, Controller, Param, Post, Put, Get, Delete, UseGuards, Req} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { UserPointDto } from './user_point.dto';

import { UserEntity } from './user.entity';
import { TwilioService } from '../twilio/twilio.service';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import { ErrorHelper } from 'src/helpers/error.utils';
import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly twilioService: TwilioService,
        private readonly userRepository: UserRepository
    ) {}

    @Get()
    index() {
        return this.userService.findAll();
    }



    @Post('send-code')
    async sendCode(
        @Req() request: Request
    ): Promise<{result: string}> {
        try {
            const userId: string = request['user']?.id;
            const user: any = await this.userService.findOne(userId);
            
            if (!user?.phone) {
                ErrorHelper.BadRequestException('Not found phone');
            }

            const code = Math.floor(100000 + Math.random() * 900000);

            const smsOptions: MessageListInstanceCreateOptions = {
                to: user.phone.replace(/^0/, '+84'),
                from: process.env.TWILIO_FROM,
                body: `This is your verify code: ${code}`,
            };

            await this.userRepository.update(userId, { code: code });
            this.twilioService.send(smsOptions);
    
            return {
                result: 'success'
            };
        } catch (error) {
            console.log(error);
        }
    }

    @Post()
    register(@Body() user: UserDto): Promise<UserDto> {
        const code = Math.floor(1000 + Math.random() * 9000);
        const registerUser = {
            ...user,
            code: code
        }
        return this.userService.save(user);
    }

    @Post()
    store(@Body() user: UserDto): Promise<UserDto> {
        return this.userService.save(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: UserDto): Promise<{result: string}> {
        return this.userService.update(id, user);
    }

    @Get(':id')
    show(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    destroy(@Param('id') id: string) {
        return this.userService.deleteById(id);
    }
}