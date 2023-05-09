/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackingDocument = Packing & Document;

@Schema()
export class Packing {
    @Prop()
    value: string;
}

export const PackingSchema = SchemaFactory.createForClass(Packing);
