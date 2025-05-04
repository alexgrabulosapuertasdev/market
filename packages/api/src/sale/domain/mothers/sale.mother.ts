import { SaleDateMother } from './sale-date.mother';
import { SaleIdMother } from './sale-id.mother';
import { SaleUserIdMother } from './sale-user-id.mother';
import { Sale } from '../aggregates/sale';
import { SaleProductMother } from './sale-products.mother';
import { PRODUCT_CATEGORY } from '../../../product/domain/enum/product-category';

interface SaleParams {
  id: string;
  date: Date;
  userId: string;
  products: Array<{
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
  }>;
}

export class SaleMother {
  static create(params?: Partial<SaleParams>): Sale {
    const primitives: SaleParams = {
      id: SaleIdMother.create().value,
      date: SaleDateMother.create().value,
      userId: SaleUserIdMother.create().value,
      products: [
        SaleProductMother.create().toPrimitives(),
        SaleProductMother.create().toPrimitives(),
      ],
      ...params,
    };

    return Sale.create(primitives);
  }
}
