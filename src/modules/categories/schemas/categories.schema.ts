/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';

export type CategoriesDocument = Categories & Document;

interface IFilterAttributes {
    title: string;
    value: [];
}

@Schema()
export class Categories {
    @Prop()
    title: string;

    @Prop()
    filterAttributes: IFilterAttributes[];
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
