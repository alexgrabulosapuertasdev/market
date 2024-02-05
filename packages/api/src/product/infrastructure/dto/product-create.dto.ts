import { PRODUCT_CATEGORY } from '../../domain/enum/product-category';

export interface ProductCreateDto {
  name: string;
  description: string;
  category: PRODUCT_CATEGORY;
  price: number;
  stock: number;
}
