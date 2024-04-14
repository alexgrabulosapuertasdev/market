import { PRODUCT_CATEGORY } from '../../domain/enum/product-category';

export interface ProductCreateRequest {
  id: string;
  name: string;
  description: string;
  category: PRODUCT_CATEGORY;
  price: number;
  stock: number;
  image: {
    originalname: string;
    mimetype: string;
    size: number;
    base64: string;
  };
}
