import { ProductCategory } from '../aggregates/product-category';
import { PRODUCT_CATEGORY } from '../enum/product-category';

export class ProductCategoryMother {
  static create(value?: PRODUCT_CATEGORY): ProductCategory {
    return new ProductCategory(
      value ?? PRODUCT_CATEGORY.ALIMENTATION_AND_DRINKS,
    );
  }
}
