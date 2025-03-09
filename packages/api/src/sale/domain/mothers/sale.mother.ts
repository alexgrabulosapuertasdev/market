import { SaleDateMother } from './sale-date.mother';
import { SaleIdMother } from './sale-id.mother';
import { SaleUserIdMother } from './sale-user-id.mother';
import { Sale } from '../aggregates/sale';
import { SaleProductMother } from '../../../sale-product/domain/mothers/sale-product.mother';

interface SaleParams {
  id: string;
  date: Date;
  userId: string;
  saleProducts: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
  }>;
}

export class SaleMother {
  static create(params?: Partial<SaleParams>): Sale {
    const primitives: SaleParams = {
      id: SaleIdMother.create().value,
      date: SaleDateMother.create().value,
      userId: SaleUserIdMother.create().value,
      saleProducts: [
        SaleProductMother.create().toPrimitives(),
        SaleProductMother.create().toPrimitives(),
      ],
      ...params,
    };

    return Sale.create(primitives);
  }
}
