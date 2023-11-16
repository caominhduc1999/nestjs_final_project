import { Injectable, NestMiddleware  } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ErrorHelper } from "src/helpers/error.utils";
import { StoreService } from "src/modules/stores/store.service";
import { INAPPROVED } from "src/constants";
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    private storeService: StoreService;

    constructor(
        private readonly jwtService: JwtService,
        private readonly moduleRef: ModuleRef,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const cookie = req.cookies['jwt'];
        if (!this.storeService) {
            // Obtain a reference to the StoreService dynamically
            this.storeService = this.moduleRef.get(StoreService);
          }

        try {
            const data = this.jwtService.verify(cookie);
            const store = await this.storeService.findOne(data.id);

            if (!store || store.is_approved == INAPPROVED) {
                ErrorHelper.BadRequestException('Inapproved');
            }
            
            req['store'] = data; // Attach user data to the request object for later use

            next();
        } catch (error) {
            if (error.status == 400) {
                ErrorHelper.BadRequestException('Inapproved');
            }
            // Handle the error here (e.g., unauthorized access)
            ErrorHelper.UnauthorizedException('Unauthorized');
        }
    }
}