import {
    Body,
    Controller,
    Delete,
    Post,
    Get,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // Order

    @UseGuards(JwtAuthGuard)
    @Get('/order/user')
    getUserOrders(@Req() request): Promise<boolean> {
        return this.userService.getUserOrders(request);
    }

    @Post('/order/create')
    createOrder(@Body() dto: any): Promise<boolean> {
        return this.userService.createOrder(dto);
    }

    // Favourite

    @UseGuards(JwtAuthGuard)
    @Get('/favourite/all')
    getAllFromFavourites(@Req() request): Promise<boolean> {
        return this.userService.getAllFromFavourites(request);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/favourite/push')
    pushFavourite(@Req() request, @Body() dto: any): Promise<boolean> {
        return this.userService.pushFavourite(request, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/favourite/remove')
    removeFavourite(@Req() request, @Body() dto: any): Promise<boolean> {
        return this.userService.removeFavourite(request, dto);
    }
}
