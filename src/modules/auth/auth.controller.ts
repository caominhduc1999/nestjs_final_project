import {Body, Controller, Post, Res, Get, Req } from '@nestjs/common';
import { StoreService } from '../stores/store.service';
import { ErrorHelper } from 'src/helpers/error.utils';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService,
        private jwtService: JwtService    
    ) {}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        return await this.authService.login(email, password, response);
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
}