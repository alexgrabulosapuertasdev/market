import { Product } from '../aggregates/product';
import { PRODUCT_CATEGORY } from '../enum/product-category';
import { ProductCategoryMother } from './product-category.mother';
import { ProductDescriptionMother } from './product-description.mother';
import { ProductIdMother } from './product-id.mother';
import { ProductImageOriginalnameMother } from './product-image-originalname.mother';
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
  imageOriginalname: string;
}

export class ProductMother {
  static create(params?: Partial<Product>): Product {
    const primitives: ProductParams = {
      id: ProductIdMother.create().value,
      name: ProductNameMother.create().value,
      description: ProductDescriptionMother.create().value,
      category: ProductCategoryMother.create().value,
      price: ProductPriceMother.create().value,
      stock: ProductStockMother.create().value,
      imageOriginalname: ProductImageOriginalnameMother.create().value,
      ...params,
    };

    return Product.create(primitives);
  }
}
