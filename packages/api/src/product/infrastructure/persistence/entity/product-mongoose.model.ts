import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PRODUCT_CATEGORY } from '../../../domain/enum/product-category';

@Schema({ timestamps: true })
export class ProductMongoose {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, charset: 'utf8mb4' })
  description: string;

  @Prop({ enum: PRODUCT_CATEGORY, required: true })
  category: PRODUCT_CATEGORY;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: Object, required: true })
  image: {
    originalname: string;
    mimetype: string;
    size: number;
    data: Buffer;
  };
}

export const ProductSchema = SchemaFactory.createForClass(ProductMongoose);
