/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
// import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TokenModule } from './modules/token/token.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot(
            'mongodb+srv://shinokid:Ee6cEMvE8n3rAWrX@cluster0.mcbxghh.mongodb.net/nestapp?retryWrites=true&w=majority',
        ),
        UsersModule,
        AuthModule,
        TokenModule,
        // FileModule,
    ],
})
export class AppModule {}
