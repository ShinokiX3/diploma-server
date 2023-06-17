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
const crypto = require('crypto');

import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
        @InjectModel(Orders.name) private orderModel: Model<OrdersDocument>,
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
            // const favourites = await this.favouritesModel.create({
            //     asins: [],
            // });
            const user = await this.userModel.create({
                ...dto,
                password: dto.password,
                joindate: new Date(),
                role: await this.roleModel.find({
                    value: 'user',
                }),
                favourites: [],
            });

            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async publicUser(email: string): Promise<AuthUserResponse | any> {
        try {
            const user = await this.userModel.find(
                {
                    email: email,
                },
                { password: 0 },
            );
            const token = await this.tokenService.generateJwtToken(user);
            return { user, token };
        } catch (e) {
            throw new Error(e);
        }
    }

    async findRole(id: string): Promise<any> {
        return await this.roleModel.findById({ _id: id });
    }

    // Order

    async getAllOrders(request: any): Promise<any> {
        try {
            const orders = await this.orderModel.find();

            return orders;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getOrderById(request: any, dto: any): Promise<any> {
        try {
            const orders = await this.orderModel.find({
                _id: dto.id,
            });

            return orders;
        } catch (e) {
            throw new Error(e);
        }
    }

    async changeOrderStatus(request: any, dto: any): Promise<any> {
        try {
            const response = await this.orderModel.updateOne(
                { _id: dto.id },
                {
                    $set: {
                        status: dto.status,
                    },
                },
            );

            return response;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getUserOrders(request: any): Promise<any> {
        try {
            const orders = await this.orderModel.find({
                user: request.user[0]._id,
            });

            return orders;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createOrder(dto: any): Promise<any> {
        try {
            const order = await this.orderModel.create({
                ...dto.order,
                status: 'В обробці',
                date: new Date(),
            });

            if (dto.user) {
                const response = await this.userModel.updateOne(
                    { _id: dto.user.id },
                    { $push: { orders: order._id } },
                );

                await order.updateOne({ $set: { user: dto.user.id } });

                return { response, order };
            }

            return order;
        } catch (e) {
            throw new Error(e);
        }
    }

    // Favourite

    async getAllFromFavourites(request: any): Promise<any> {
        try {
            const user = await this.userModel.find({
                _id: request.user[0]._id,
            });
            // const products = await Promise.all

            return user[0].favourites;
        } catch (e) {
            throw new Error(e);
        }
    }

    async pushFavourite(request: any, dto: any): Promise<any> {
        try {
            const response = await this.userModel.updateOne(
                { _id: request.user[0]._id },
                { $push: { favourites: dto.id } },
            );

            return response;
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeFavourite(request: any, dto: any): Promise<any> {
        try {
            const user = await this.userModel.find({
                _id: request.user[0]._id,
            });

            const favourites = user[0].favourites.filter(
                (item) => item !== dto.id,
            );

            const response = await this.userModel.updateOne(
                { _id: request.user[0]._id },
                {
                    $set: {
                        favourites: [...favourites],
                    },
                },
            );

            return response;
        } catch (e) {
            throw new Error(e);
        }
    }

    // Liqpay

    async getLiqpayData(dto: any): Promise<any> {
        try {
            const data = Buffer.from(JSON.stringify(dto.params)).toString(
                'base64',
            );
            const signature = stringToSignature(
                dto.private_key + data + dto.private_key,
            );
            return { data, signature };
        } catch (error) {
            console.log(error);
        }
    }

    // Chart

    async getUserServiceChartInfo(request: any): Promise<any> {
        try {
            const orders = await this.orderModel.find();
            const sortedOrders = orders.sort((a, b) =>
                a.date > b.date ? -1 : 1,
            );
            const byDate = {};
            sortedOrders.forEach((order) => {
                const date = fd(order.date);
                if (byDate[date]) byDate[date].push(order);
                else byDate[date] = [order];
            });
            const result = [];
            for (const key in byDate) {
                result.push([key, byDate[key].length]);
            }

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // User

    async getAllUsers(request: any): Promise<any> {
        try {
            const users = await this.userModel.find();

            return users;
        } catch (error) {
            console.log(error);
        }
    }
}

function stringToSignature(str: string) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('base64');
}

function fd(date) {
    return ['year', 'month', 'day']
        .map((e) =>
            new Intl.DateTimeFormat('en', {
                [e]: 'numeric',
            })
                .format(date)
                .padStart(2, '0'),
        )
        .join('-');
}

// const response = await this.userModel.updateOne(
//     { _id: request.user._id },
//     { $set: { favourites: [...request, dto.id] } },
// );
