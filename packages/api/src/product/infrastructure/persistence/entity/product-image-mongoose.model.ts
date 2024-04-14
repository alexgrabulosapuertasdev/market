import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ProductImageMongoose {
  @Prop({ unique: true })
  productId: string;

  @Prop()
  originalname: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  base64: string;
}

export const ProductImageSchema =
  SchemaFactory.createForClass(ProductImageMongoose);
