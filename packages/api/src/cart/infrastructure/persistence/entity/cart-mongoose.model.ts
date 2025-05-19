import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class CartMongoose {
  @Prop({ unique: true, required: true })
  userId: string;

  @Prop({ required: true })
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

export const CartSchema = SchemaFactory.createForClass(CartMongoose);
