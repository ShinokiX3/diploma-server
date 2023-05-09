/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ManufacturerDocument = Manufacturer & Document;

@Schema()
export class Manufacturer {
    @Prop()
    value: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
