import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';

import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { Role, RoleDocument } from './schemas/role.schema';
import { Favourites, FavouritesDocument } from './schemas/favourites.schema';
import { Orders, OrdersDocument } from './schemas/orders.schema';

import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
        @InjectModel(Favourites.name)
        private favouritesModel: Model<FavouritesDocument>,
        @InjectModel(Orders.name) private OrdersModel: Model<OrdersDocument>,
        private readonly tokenService: TokenService,
    ) {}

    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10);
        } catch (e) {
            throw new Error(e);
        }
    }

    async findUserByEmail(email: string): Promise<User | any> {
        try {
            return await this.userModel.find({
                email: email,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async findUserById(id: number): Promise<User | any> {
        try {
            return await this.userModel.find({
                _id: id,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            dto.password = await this.hashPassword(dto.password);
            const favourites = await this.favouritesModel.create({
                asins: [],
            });
            const user = await this.userModel.create({
                ...dto,
                password: dto.password,
                joindate: new Date(),
                role: await this.roleModel.find({
                    value: 'user',
                }),
                favourites: favourites._id,
            });

            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async publicUser(email: string): Promise<AuthUserResponse | any> {
        try {
            const user = await this.userModel.find({
                email: email,
                // TODO: exclude password
            });
            const token = await this.tokenService.generateJwtToken(user);
            return { user, token };
        } catch (e) {
            throw new Error(e);
        }
    }

    async findRole(id: string): Promise<any> {
        return await this.roleModel.findById({ _id: id });
    }

    // async updateUser(
    //     userId: number,
    //     dto: UpdateUserDTO,
    // ): Promise<UpdateUserDTO> {
    //     try {
    //         await this.userRepository.update(dto, { where: { id: userId } });
    //         return dto;
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // }

    // async updatePassword(userId: number, dto: UpdatePasswordDTO): Promise<any> {
    //     try {
    //         const { password } = await this.findUserById(userId);
    //         const currentPassword = await bcrypt.compare(
    //             dto.oldPassword,
    //             password,
    //         );
    //         if (!currentPassword)
    //             return new BadRequestException(AppError.WRONG_DATA);
    //         const newPassword = await this.hashPassword(dto.newPassword);
    //         const data = {
    //             password: newPassword,
    //         };
    //         return this.userRepository.update(data, { where: { id: userId } });
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // }

    // async deleteUser(id: number): Promise<boolean> {
    //     try {
    //         await this.userRepository.destroy({ where: { id } });
    //         return true;
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // }
}
