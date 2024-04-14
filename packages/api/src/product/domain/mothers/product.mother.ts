import { Product } from '../aggregates/product';
import { PRODUCT_CATEGORY } from '../enum/product-category';
import { ProductCategoryMother } from './product-category.mother';
import { ProductDescriptionMother } from './product-description.mother';
import { ProductIdMother } from './product-id.mother';
import { ProductImageMother } from './product-image.mother';
import { ProductNameMother } from './product-name.mother';
import { ProductPriceMother } from './product-price.mother';
import { ProductStockMother } from './product-stock.mother';

interface ProductParams {
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

export class ProductMother {
  static create(params?: Partial<ProductParams>): Product {
    const primitives: ProductParams = {
      id: ProductIdMother.create().value,
      name: ProductNameMother.create().value,
      description: ProductDescriptionMother.create().value,
      category: ProductCategoryMother.create().value,
      price: ProductPriceMother.create().value,
      stock: ProductStockMother.create().value,
      image: ProductImageMother.create().value,
      ...params,
    };

    return Product.create(primitives);
  }
}
