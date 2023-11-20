import {Body, Controller, Post, Res, Get, Req, Logger } from '@nestjs/common';
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
import { APPROVED, BRONZE_RANK } from 'src/constants';
import { StoreRepository } from '../stores/repository/store.repository';
import { RegisterStoreDto } from './dto/register-store.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { StoreLoginDto } from './dto/store-login.dto';
import * as fs from 'fs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly twilioService: TwilioService,
        private readonly userService: UserService,
        private readonly storeService: StoreService,
        private readonly storeRepository: StoreRepository,
        private readonly logger: Logger
    ) {}

    @Post('user/register')
    registerUser(@Body() user: RegisterUserDto): Promise<UserDto> {
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
    async registerStore(@Body() store: RegisterStoreDto): Promise<StoreDto> {
        const code = Math.floor(100000 + Math.random() * 900000);
        const registerStore = {
            ...store,
            code: code,
            password: await bcrypt.hash(store.password, 12)
        }

        this.logger.log(`Store created successfully`);
        this.logger.log(JSON.stringify(registerStore));

        return this.storeService.save(registerStore);
    }

    @Post('verify')
    async verifyStore(
        @Body('phone') phone: string,
        @Body('code') code: string,
    ): Promise<any> {
        const store = await this.storeRepository.findOneBy('phone', phone);

        if (!store) {
            ErrorHelper.NotFoundException('Not found store');
        }

        if (code != store.code) {
            ErrorHelper.BadRequestException('wrong code');
        }

        await this.storeRepository.update(store.id, { code: null, is_approved: APPROVED });

        return {
            result: 'success'
        };
    }

    @Post('user/login')
    async userLogin(
        @Body() userLogin: UserLoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return await this.authService.login(null, null, userLogin.phone, userLogin.code, response, 'user');
    }

    @Post('store/login')
    async storeLogin(
        @Body() storeLogin: StoreLoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return await this.authService.login(storeLogin.email, storeLogin.password, null, null, response, 'store');
    }

    @Post('admin/login')
    async adminLogin(
        @Body() adminLogin: StoreLoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return await this.authService.login(adminLogin.email, adminLogin.password, null, null, response, 'admin');
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

    @Post('store/refresh-token')
    async storeRefreshToken(
        @Body('refresh_token') refreshToken: string,
        @Res({ passthrough: true }) response: Response
    ) {
        return await this.authService.refreshToken(refreshToken, response, 'store');
    }

    @Post('user/refresh-token')
    async userRefreshToken(
        @Body('refresh_token') refreshToken: string,
        @Res({ passthrough: true }) response: Response
    ) {
        return await this.authService.refreshToken(refreshToken, response, 'user');
    }

    @Get('download-log')
    async downloadLogFile(@Res() res: Response): Promise<void> {
      const logFilePath = 'dev_combine.log';
  
      // Check if the file exists
      if (!fs.existsSync(logFilePath)) {
        res.status(404).send('Log file not found');
        return;
      }
  
      // Set the appropriate headers for file download
      res.header('Content-Type', 'text/plain');
      res.header('Content-Disposition', 'attachment; filename=dev_combine.log');
  
      // Stream the file content to the response
      const fileStream = fs.createReadStream(logFilePath);
      fileStream.pipe(res);
    }
}