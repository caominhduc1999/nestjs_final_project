import {Body, Controller, Post, Res, Get, Req } from '@nestjs/common';
import { StoreService } from '../stores/store.service';
import { ErrorHelper } from 'src/helpers/error.utils';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserService } from '../users/user.service';
import { UserRepository } from '../users/repository/user.repository';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import { TwilioService } from '../twilio/twilio.service';
import { UserDto } from '../users/dto/user.dto';
import { StoreDto } from '../stores/dto/store.dto';
import { BRONZE_RANK } from 'src/constants';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly twilioService: TwilioService,
        private readonly userService: UserService,
        private readonly storeService: StoreService
    ) {}

    @Post('user/register')
    registerUser(@Body() user: UserDto): Promise<UserDto> {
        console.log(user);
        
        const code = Math.floor(100000 + Math.random() * 900000);
        const registerUser = {
            ...user,
            code: code,
            rank: BRONZE_RANK
        }

        const smsOptions: MessageListInstanceCreateOptions = {
            to: user.phone.replace(/^0/, '+84'),
            from: process.env.TWILIO_FROM,
            body: `This is your verify code: ${code}`,
        };
        // this.twilioService.send(smsOptions);

        return this.userService.save(registerUser);
    }

    @Post('store/register')
    registerStore(@Body() store: StoreDto): Promise<StoreDto> {
        const code = Math.floor(100000 + Math.random() * 900000);
        const registerStore = {
            ...store,
            code: code
        }
        return this.storeService.save(registerStore);
    }

    @Post('user/login')
    async userLogin(
        @Body('phone') phone: string,
        @Body('code') code: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        return await this.authService.login(null, null, phone, code, response, 'user');
    }

    @Post('store/login')
    async storeLogin(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        return await this.authService.login(email, password, null, null, response, 'store');
    }

    @Get('cookie')
    async getCookie(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                ErrorHelper.UnauthorizedException('Unauthorized');
            }

            return data;
        } catch (e) {
            ErrorHelper.UnauthorizedException('Unauthorized');
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }

    @Post('send-code')
    async sendCode(
        @Body('phone') phone: string
    ): Promise<{result: string}> {
        try {
            const user: any = await this.userRepository.findOneBy('phone', phone);
            
            if (!user?.phone) {
                ErrorHelper.BadRequestException('Not found phone');
            }

            const code = Math.floor(100000 + Math.random() * 900000);

            const smsOptions: MessageListInstanceCreateOptions = {
                to: user.phone.replace(/^0/, '+84'),
                from: process.env.TWILIO_FROM,
                body: `This is your verify code: ${code}`,
            };

            await this.userRepository.update(user.id, { code: code });
            this.twilioService.send(smsOptions);
    
            return {
                result: 'success'
            };
        } catch (error) {
            console.log(error);
        }
    }
}