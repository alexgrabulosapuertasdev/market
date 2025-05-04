import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PRODUCT_CATEGORY } from '../../../../product/domain/enum/product-category';

@Schema({ timestamps: true })
export class SaleMongoose {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  products: Array<{
    productId: string;
    name: string;
    description: string;
    category: PRODUCT_CATEGORY;
    price: number;
    quantity: number;
    totalAmount: number;
    image: {
      originalname: string;
      mimetype: string;
      size: number;
      data: Buffer;
    };
  }>;
}

export const SaleSchema = SchemaFactory.createForClass(SaleMongoose);
