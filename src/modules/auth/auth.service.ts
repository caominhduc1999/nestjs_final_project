import { Injectable, Body, Res } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Store } from '../../entities';
import { StoreDto } from '../stores/dto/store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreRepository } from '../stores/repository/store.repository';
import { ErrorHelper } from 'src/helpers/error.utils';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt/dist';
import { UserRepository } from '../users/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly storeRepository: StoreRepository,
        private readonly userRepository: UserRepository,
        private jwtService: JwtService
    ) {
      
    }

    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('phone') phone: string,
        @Body('code') code: string,
        @Res({passthrough: true}) response: Response,
        @Body('type') type: string, // Assuming you pass the type of user or store in the request body
    ) {
        let entity;
        let entityName;

        if (type === 'user') {
            entity = await this.userRepository.findOneBy('phone', phone);
            entityName = 'User';
        } else if (type === 'store') {
            entity = await this.storeRepository.findOneBy('email', email);
            entityName = 'Store';
        } else {
            ErrorHelper.BadRequestException('Invalid entity type');
        }
        
        if (!entity) {
            ErrorHelper.BadRequestException(`Invalid ${entityName} credentials`);
        }

        if (entityName == 'Store') {
            if (!await bcrypt.compare(password, entity.password)) {
                ErrorHelper.BadRequestException(`Invalid ${entityName} credentials`);
            }
        }

        if (entityName == 'User') {
            if (entity.code != code) {
                ErrorHelper.BadRequestException(`Invalid ${entityName} credentials`);
            }
        }

        if (entityName == 'User') {
            // update user code to null: TODO
            await this.userRepository.update(entity.id, { code: null });
        }

        const jwt = await this.jwtService.signAsync({id: entity.id});
        
        response.cookie('jwt', jwt, {httpOnly: true});

        return {
            message: 'success',
            access_token: jwt
        };
    }
}