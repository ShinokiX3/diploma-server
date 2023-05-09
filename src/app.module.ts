/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TokenModule } from './modules/token/token.module';

import * as path from 'path';
import { FileModule } from './modules/file/file.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, './modules/static'),
        }),
        MongooseModule.forRoot(
            'mongodb+srv://shinoki:wIFaMIJF9c0slsdX@diplom-server.jkgitar.mongodb.net/diplomaapp?retryWrites=true&w=majority',
        ),
        UsersModule,
        ProductsModule,
        CategoriesModule,
        AuthModule,
        TokenModule,
        FileModule,
    ],
})
export class AppModule {}
