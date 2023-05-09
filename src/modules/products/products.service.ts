import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { CreateUserDTO } from './dto';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';

import { Model } from 'mongoose';

import { Products, ProductsDocument } from './schemas/products.schema';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { Kind, KindDocument } from './schemas/kind.schema';
import {
    Manufacturer,
    ManufacturerDocument,
} from './schemas/manufacturer.schema';
import { Packing, PackingDocument } from './schemas/packing.schema';
import { Strength, StrengthDocument } from './schemas/strength.schema';
import { Capacity, CapacityDocument } from './schemas/сapacity.schema';

import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDTO } from './dto';

import { FileService, FileType } from '../file/file.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name)
        private productsModel: Model<ProductsDocument>,
        @InjectModel(Brand.name)
        private brandModel: Model<BrandDocument>,
        @InjectModel(Kind.name)
        private kindModel: Model<KindDocument>,
        @InjectModel(Manufacturer.name)
        private manufacturerModel: Model<ManufacturerDocument>,
        @InjectModel(Packing.name)
        private packingModel: Model<PackingDocument>,
        @InjectModel(Strength.name)
        private strengthModel: Model<StrengthDocument>,
        @InjectModel(Capacity.name)
        private capacityModel: Model<CapacityDocument>,
        private readonly tokenService: TokenService,
        private fileService: FileService,
    ) {}

    // Product

    async getAllProducts(): Promise<any> {
        try {
            const products = await this.productsModel.find();
            return products;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createProduct(dto: CreateProductDTO, picture): Promise<any> {
        return picture;
        try {
            const product = await this.productsModel.find({
                title: dto.title,
            });

            if (product.length < 1) {
                const picturePath = this.fileService.createFile(
                    FileType.IMAGE,
                    picture,
                );

                const product = this.productsModel.create({
                    ...dto,
                    picture: picturePath,
                });

                return product;
            }
            return { error: '', message: 'Product already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editProduct(dto: any): Promise<any> {
        try {
            const product = await this.productsModel.find();
            return product;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteProduct(dto: any): Promise<any> {
        try {
            const product = await this.productsModel.find({ _id: dto.id });
            if (product.length === 1) {
                const product = this.productsModel.deleteOne({
                    _id: dto.id,
                });
                return product;
            }
            return { error: '', message: 'Product doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }
}
