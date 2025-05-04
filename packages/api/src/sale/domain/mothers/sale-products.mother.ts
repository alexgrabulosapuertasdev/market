import { SaleProduct } from '../aggregates/sale-product';
import { SaleProductImageMother } from './sale-product-image.mother';
import { SaleProductNameMother } from './sale-product-name.mother';
import { SaleProductPriceMother } from './sale-product-price.mother';
import { SaleProductProductIdMother } from './sale-product-product-id.mother';
import { SaleProductQuantityMother } from './sale-product-quantity.mother';
import { PRODUCT_CATEGORY } from '../../../product/domain/enum/product-category';
import { SaleProductDescriptionMother } from './sale-product-description.mother';
import { SaleProductCategoryMother } from './sale-product-category.mother';

interface SaleProductParams {
  productId: string;
  name: string;
  description: string;
  category: PRODUCT_CATEGORY;
  price: number;
  quantity: number;
  image: {
    originalname: string;
    mimetype: string;
    size: number;
    data: Buffer;
  };
}

export class SaleProductMother {
  static create(params?: Partial<SaleProductParams>): SaleProduct {
    const price = SaleProductPriceMother.create().value;
    const quantity = SaleProductQuantityMother.create().value;
    const primitives: SaleProductParams = {
      productId: SaleProductProductIdMother.create().value,
      name: SaleProductNameMother.create().value,
      description: SaleProductDescriptionMother.create().value,
      category: SaleProductCategoryMother.create().value,
      price,
      quantity,
      image: SaleProductImageMother.create().value,
      ...params,
    };

    return SaleProduct.create(primitives);
  }
}
