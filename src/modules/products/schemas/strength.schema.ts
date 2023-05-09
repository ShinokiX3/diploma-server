/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StrengthDocument = Strength & Document;

@Schema()
export class Strength {
    @Prop()
    value: string;
}

export const StrengthSchema = SchemaFactory.createForClass(Strength);
