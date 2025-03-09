import { SaleProduct } from '../aggregates/sale-product';
import { SaleProductIdMother } from './sale-product-id.mother';
import { SaleProductNameMother } from './sale-product-name.mother';
import { SaleProductPriceMother } from './sale-product-price.mother';
import { SaleProductProductIdMother } from './sale-product-product-id.mother';
import { SaleProductQuantityMother } from './sale-product-quantity.mother';

interface SaleProductParams {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productId: string;
}

export class SaleProductMother {
  static create(params?: Partial<SaleProductParams>): SaleProduct {
    const primitives: SaleProductParams = {
      id: SaleProductIdMother.create().value,
      name: SaleProductNameMother.create().value,
      price: SaleProductPriceMother.create().value,
      quantity: SaleProductQuantityMother.create().value,
      productId: SaleProductProductIdMother.create().value,
      ...params,
    };

    return SaleProduct.create(primitives);
  }
}
