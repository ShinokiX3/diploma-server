/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schemas/categories.schema';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from 'src/strategy';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Categories.name, schema: CategoriesSchema },
        ]),
        UsersModule,
        TokenModule,
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService, JwtStrategy, ConfigService],
    exports: [CategoriesService],
})
export class CategoriesModule {}
