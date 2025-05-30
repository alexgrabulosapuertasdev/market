import { PRODUCT_CATEGORY } from '../../enum/product-category.enum';

export interface ProductResponse {
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

export interface ProductCreateDTO {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: File;
}
