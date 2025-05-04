import { PRODUCT_CATEGORY } from '../../../product/domain/enum/product-category';

export interface SaleResponseDto {
  id: string;
  date: Date;
  totalAmount: number;
  userId: string;
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
      base64: string;
    };
  }>;
}
