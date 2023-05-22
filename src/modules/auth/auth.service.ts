import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from '../../common/constants/errors';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async registerUsers(dto: CreateUserDTO): Promise<AuthUserResponse | any> {
        try {
            const existUser = await this.userService.findUserByEmail(dto.email);
            if (existUser.length > 0)
                throw new BadRequestException(AppError.USER_EXIST);
            await this.userService.createUser(dto);
            return this.userService.publicUser(dto.email);
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
        try {
            const existUser = await this.userService.findUserByEmail(dto.email);

            if (existUser.length < 1)
                throw new BadRequestException(AppError.USER_NOT_EXIST);
            const validatePassword = await bcrypt.compare(
                dto.password,
                existUser[0].password,
            );

            if (!validatePassword)
                throw new BadRequestException(AppError.WRONG_DATA);
            return this.userService.publicUser(dto.email);
        } catch (e) {
            throw new Error(e);
        }
    }

    async loginAdmin(dto: UserLoginDTO): Promise<AuthUserResponse> {
        try {
            const existUser = await this.userService.findUserByEmail(dto.email);

            if (existUser.length < 1)
                throw new BadRequestException(AppError.USER_NOT_EXIST);
            const validatePassword = await bcrypt.compare(
                dto.password,
                existUser[0].password,
            );

            if (!validatePassword)
                throw new BadRequestException(AppError.WRONG_DATA);

            const role = await this.userService.findRole(existUser[0].role[0]);

            if (role.value !== 'admin')
                throw new BadRequestException(AppError.PERMISSION_ERROR);

            return this.userService.publicUser(dto.email);
        } catch (e) {
            throw new Error(e);
        }
    }

    async check(dto: any): Promise<any> {
        try {
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    async test() {
        return 'hello world';
    }
}
