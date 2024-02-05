import { PRODUCT_CATEGORY } from '../enum/product-category';

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  category: PRODUCT_CATEGORY;
  price: number;
  stock: number;
  imageBase64: string;
}
