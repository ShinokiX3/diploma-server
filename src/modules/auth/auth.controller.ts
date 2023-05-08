import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {}

    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
        return this.authService.registerUsers(dto);
    }

    @Post('login')
    login(
        @Body() dto: UserLoginDTO,
    ): Promise<AuthUserResponse | BadRequestException> {
        return this.authService.loginUser(dto);
    }

    @Get('login')
    test() {
        return 'hello worldd';
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-public-user-info')
    getPublicUserInfo(@Req() request) {
        const user = request.user;
        return this.userService.publicUser(user.email);
    }
}
