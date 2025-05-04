import { PRODUCT_CATEGORY } from '../../../product/domain/enum/product-category';
import { EnumValueObject } from '../../../shared/domain/value-object/enum.value-object';

export class SaleProductCategory extends EnumValueObject {
  constructor(readonly value: PRODUCT_CATEGORY) {
    super(value, PRODUCT_CATEGORY);
  }
}
