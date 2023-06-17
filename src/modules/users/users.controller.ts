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
import { AdminRoleGuard } from 'src/guards/roles-guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // Order

    @UseGuards(JwtAuthGuard)
    @Get('/order/all')
    getAllOrders(@Req() request): Promise<boolean> {
        return this.userService.getAllOrders(request);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/order/user')
    getUserOrders(@Req() request): Promise<boolean> {
        return this.userService.getUserOrders(request);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/order/id')
    getOrderById(@Req() request, @Body() dto: any): Promise<boolean> {
        return this.userService.getOrderById(request, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/order/change')
    changeOrderStatus(@Req() request, @Body() dto: any): Promise<boolean> {
        return this.userService.changeOrderStatus(request, dto);
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

    // Liqpay

    @Post('/liqpay/data')
    getLiqpayData(@Body() dto: any): Promise<any> {
        return this.userService.getLiqpayData(dto);
    }

    // Chart

    @Get('/chart/all')
    getUserServiceChartInfo(@Req() request): Promise<any> {
        return this.userService.getUserServiceChartInfo(request);
    }

    // Chart

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getAllUsers(@Req() request): Promise<any> {
        return this.userService.getAllUsers(request);
    }
}
