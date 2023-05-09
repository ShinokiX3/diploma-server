/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Categories } from '../../categories/schemas/categories.schema';
import { Brand } from './brand.schema';
import { Capacity } from './сapacity.schema';
import { Kind } from './kind.schema';
import { Packing } from './packing.schema';
import { Manufacturer } from './manufacturer.schema';
import { Strength } from './strength.schema';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
    @Prop()
    code: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    picture: string;

    @Prop()
    cost: number;

    @Prop()
    inStockQuantity: number;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
    })
    category: Categories;

    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
    // })
    // brand: Brand;

    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Strength' }],
    // })
    // strength: Strength;

    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
    // })
    // capacity: Capacity;

    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kind' }],
    // })
    // kind: Kind;

    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' }],
    // })
    // manufacturer: Manufacturer;

    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Packing' }],
    // })
    // packing: Packing;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
