/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrdersDocument = Orders & Document;

// id
// date
// status

// products
// cost
// quantity

// delivery department
// delivery cost

// pos user info

@Schema()
export class Orders {
    @Prop()
    asins: string[];
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
