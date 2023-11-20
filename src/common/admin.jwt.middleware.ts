import { Injectable, NestMiddleware  } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ErrorHelper } from "src/helpers/error.utils";

import { INAPPROVED } from "src/constants";
import { ModuleRef } from '@nestjs/core';
import { AdminService } from "src/modules/admins/admin.service";

@Injectable()
export class AdminJwtMiddleware implements NestMiddleware {
    private adminService: AdminService;

    constructor(
        private readonly jwtService: JwtService,
        private readonly moduleRef: ModuleRef,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const cookie = req.cookies['jwt'];
        if (!this.adminService) {
            // Obtain a reference to the AdminService dynamically
            this.adminService = this.moduleRef.get(AdminService);
          }

        try {
            const data = this.jwtService.verify(cookie);
            const admin = await this.adminService.findOne(data.id);

            if (!admin) {
                ErrorHelper.NotFoundException('Not found admin');
            }
            
            req['admin'] = data; // Attach user data to the request object for later use

            next();
        } catch (error) {
            // Handle the error here (e.g., unauthorized access)
            ErrorHelper.UnauthorizedException('Unauthorized admin');
        }
    }
}