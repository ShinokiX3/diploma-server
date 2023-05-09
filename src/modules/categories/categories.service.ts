import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { CreateUserDTO } from './dto';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';

import { Model } from 'mongoose';

import { Categories, CategoriesDocument } from './schemas/categories.schema';

import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDTO } from './dto';

// async registerUsers(dto: CreateUserDTO): Promise<AuthUserResponse | any> {
//     try {
//         const existUser = await this.userService.findUserByEmail(dto.email);
//         if (existUser.length > 0)
//             throw new BadRequestException(AppError.USER_EXIST);
//         await this.userService.createUser(dto);
//         return this.userService.publicUser(dto.email);
//     } catch (e) {
//         throw new BadRequestException('error');
//     }
// }

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Categories.name)
        private categoriesModel: Model<CategoriesDocument>,
        private readonly tokenService: TokenService,
    ) {}

    async getCategories(): Promise<any> {
        try {
            const categories = await this.categoriesModel.find();
            return categories;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createCategory(dto: CreateCategoryDTO): Promise<any> {
        try {
            const category = await this.findCategoryByTitle(dto.title);

            if (category.length < 1) {
                const category = this.categoriesModel.create({
                    title: dto.title,
                    filterAttributes: [],
                });

                return category;
            }
            return { error: '', message: 'Category already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editCategory(dto: any): Promise<any> {
        try {
            const categories = await this.categoriesModel.find();
            return categories;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteCategory(dto: any): Promise<any> {
        try {
            const category = await this.findCategoryById(dto.id);
            if (category.length === 1) {
                const category = this.categoriesModel.deleteOne({
                    _id: dto.id,
                });
                return category;
            }
            return { error: '', message: 'Category doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async findCategoryByTitle(title: string): Promise<any> {
        try {
            return await this.categoriesModel.find({ title: title });
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async findCategoryById(id: string): Promise<any> {
        try {
            return await this.categoriesModel.find({ _id: id });
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // async findUserByEmail(email: string): Promise<User | any> {
    //     try {
    //         return await this.userModel.find({
    //             email: email,
    //         });
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // }

    // async registerUsers(dto: CreateUserDTO): Promise<AuthUserResponse | any> {
    //     try {
    //         const existUser = await this.userService.findUserByEmail(dto.email);
    //         if (existUser.length > 0)
    //             throw new BadRequestException(AppError.USER_EXIST);
    //         await this.userService.createUser(dto);
    //         return this.userService.publicUser(dto.email);
    //     } catch (e) {
    //         throw new BadRequestException('error');
    //     }
    // }
}
