import {
    Body,
    Controller,
    Delete,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // @UseGuards(JwtAuthGuard)
    // @Patch()
    // updateUser(
    //     @Body() updateDto: UpdateUserDTO,
    //     @Req() request,
    // ): Promise<UpdateUserDTO> {
    //     const user = request.user;
    //     return this.userService.updateUser(user.id, updateDto);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Patch('change-password')
    // updatePassword(
    //     @Body() updatePasswordDto: UpdatePasswordDTO,
    //     @Req() request,
    // ): Promise<any> {
    //     const user = request.user;
    //     return this.userService.updatePassword(user.id, updatePasswordDto);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Delete()
    // deleteUser(@Req() request): Promise<boolean> {
    //     const user = request.user;
    //     return this.userService.deleteUser(user.id);
    // }
}
