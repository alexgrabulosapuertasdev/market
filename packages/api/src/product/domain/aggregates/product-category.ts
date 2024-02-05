import { PRODUCT_CATEGORY } from '../enum/product-category';
import { EnumValueObject } from '../../../shared/domain/value-object/enum.value-object';

export class ProductCategory extends EnumValueObject {
  constructor(readonly value: PRODUCT_CATEGORY) {
    super(value, PRODUCT_CATEGORY);
  }
}
