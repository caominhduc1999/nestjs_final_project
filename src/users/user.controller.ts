import {Body, Controller, Param, Post, Put, Get, Delete} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    index() {
        return this.userService.findAll();
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