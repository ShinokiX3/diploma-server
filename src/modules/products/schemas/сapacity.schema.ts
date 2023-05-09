/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CapacityDocument = Capacity & Document;

@Schema()
export class Capacity {
    @Prop()
    value: string;
}

export const CapacitySchema = SchemaFactory.createForClass(Capacity);
