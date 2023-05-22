/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Products, ProductsSchema } from './schemas/products.schema';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { Kind, KindSchema } from './schemas/kind.schema';
import {
    Manufacturer,
    ManufacturerSchema,
} from './schemas/manufacturer.schema';
import { Packing, PackingSchema } from './schemas/packing.schema';
import { Strength, StrengthSchema } from './schemas/strength.schema';
import { Capacity, CapacitySchema } from './schemas/сapacity.schema';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from 'src/strategy';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { FileService } from '../file/file.service';
import {
    Categories,
    CategoriesSchema,
} from '../categories/schemas/categories.schema';
import { CategoriesModule } from '../categories/categories.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Products.name, schema: ProductsSchema },
        ]),
        MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
        MongooseModule.forFeature([{ name: Kind.name, schema: KindSchema }]),
        MongooseModule.forFeature([
            { name: Manufacturer.name, schema: ManufacturerSchema },
        ]),
        MongooseModule.forFeature([
            { name: Packing.name, schema: PackingSchema },
        ]),
        MongooseModule.forFeature([
            { name: Strength.name, schema: StrengthSchema },
        ]),
        MongooseModule.forFeature([
            { name: Capacity.name, schema: CapacitySchema },
        ]),
        UsersModule,
        CategoriesModule,
        TokenModule,
    ],
    controllers: [ProductsController],
    providers: [ProductsService, JwtStrategy, ConfigService, FileService],
    exports: [ProductsService],
})
export class ProductsModule {}
