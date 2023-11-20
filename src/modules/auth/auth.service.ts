import { Injectable, Body, Res, UnauthorizedException } from '@nestjs/common';
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

    async generateRefreshToken(user: any): Promise<string> {
        // You can customize the payload as needed
        const refreshPayload = { id: user.id, email: user.email };
        const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: '7d' }); // Set the expiration time as needed
        // Store the refresh token in your preferred storage (e.g., database)
        // You may also want to associate the refresh token with the user

        return refreshToken;
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

        const refreshToken = await this.generateRefreshToken(entity);
        const jwt = await this.jwtService.signAsync({id: entity.id});
        
        response.cookie('jwt', jwt, {httpOnly: true});
        response.cookie('refreshToken', refreshToken, {httpOnly: true});

        return {
            message: 'success',
            access_token: jwt,
            refresh_token: refreshToken
        };
    }

    async refreshToken(
        @Body('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
        @Body('type') type: string,
    ) {
        try {
            // Verify the refresh token
            const decoded = this.jwtService.verify(refreshToken);
            
            let entity;
            if (type === 'user') {
                entity = await this.userRepository.findOneBy('id', decoded.id);
            } else if (type === 'store') {
                entity = await this.storeRepository.findOneBy('id', decoded.id);
            } else {
                ErrorHelper.UnauthorizedException('Invalid token type');
            }


            const newRefreshToken = await this.generateRefreshToken(entity);
            // Generate a new access token
            const accessToken = await this.jwtService.signAsync({ id: entity.id });

            // Set the new access token in the response
            response.cookie('jwt', accessToken, {
                httpOnly: true,
            });

            return {
                message: 'success',
                access_token: accessToken,
                refresh_token: newRefreshToken
            };
        } catch (error) {
            // Handle token verification error (e.g., token expired, invalid token)
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }
}