import { SaleProductCategory } from '../aggregates/sale-product-category';
import { PRODUCT_CATEGORY } from '../../../product/domain/enum/product-category';

export class SaleProductCategoryMother {
  static create(value?: PRODUCT_CATEGORY): SaleProductCategory {
    return new SaleProductCategory(
      value ?? PRODUCT_CATEGORY.ALIMENTATION_AND_DRINKS,
    );
  }
}
