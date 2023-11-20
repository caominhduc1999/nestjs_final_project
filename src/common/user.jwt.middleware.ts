import { Injectable, NestMiddleware  } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ErrorHelper } from "src/helpers/error.utils";
import { StoreService } from "src/modules/stores/store.service";
import { INAPPROVED } from "src/constants";
import { ModuleRef } from '@nestjs/core';
import { UserService } from "src/modules/users/user.service";

@Injectable()
export class UserJwtMiddleware implements NestMiddleware {
    private userService: UserService;

    constructor(
        private readonly jwtService: JwtService,
        private readonly moduleRef: ModuleRef,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const cookie = req.cookies['jwt'];
        if (!this.userService) {
            // Obtain a reference to the userService dynamically
            this.userService = this.moduleRef.get(UserService);
          }

        try {
            const data = this.jwtService.verify(cookie);
            const user = await this.userService.findOne(data.id);

            if (!user) {
                ErrorHelper.NotFoundException('Not found');
            }
            
            req['user'] = data; // Attach user data to the request object for later use
            
            next();
        } catch (error) {
            if (error.status == 404) {
                ErrorHelper.NotFoundException('Not found');
            }
            // Handle the error here (e.g., unauthorized access)
            ErrorHelper.UnauthorizedException('Unauthorized user');
        }
    }
}