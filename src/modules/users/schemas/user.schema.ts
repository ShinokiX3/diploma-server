/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Role } from './role.schema';
import { Orders } from './orders.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    joindate: Date;

    @Prop()
    birthdate: Date;

    @Prop()
    picture: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    role: Role[];

    @Prop()
    favourites: string[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
    })
    orders: Orders[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// @Prop({
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favourites' }],
// })
// favourites: Favourites;
