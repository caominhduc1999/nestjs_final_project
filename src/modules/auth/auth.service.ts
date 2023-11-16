import { Injectable, Body, Res } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Store } from '../stores/store.entity';
import { StoreDto } from '../stores/store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreRepository } from '../stores/store.repository';
import { ErrorHelper } from 'src/helpers/error.utils';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        private readonly storeRepository: StoreRepository,
        private jwtService: JwtService
    ) {
      
    }

    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const store = await this.storeRepository.findOneBy('email', email);

        if (!store) {
            ErrorHelper.BadRequestException('Invalid credentials');
        }

        if (!await bcrypt.compare(password, store.password)) {
            ErrorHelper.BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: store.id});
        
        response.cookie('jwt', jwt, {httpOnly: true});

        return {
            message: 'success',
            access_token: jwt
        };
    }
}