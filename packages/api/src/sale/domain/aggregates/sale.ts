import { SaleDate } from './sale-date';
import { SaleId } from './sale-id';
import { SaleTotalAmount } from './sale-total-amount';
import { SaleUserId } from './sale-user-id';
import { SaleProduct } from '../../../sale-product/domain/aggregates/sale-product';

interface Primitives {
  id: string;
  date: Date;
  totalAmount: number;
  userId: string;
  saleProducts: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
    totalAmount: number;
  }>;
}

type PrimitivesCreate = Omit<Primitives, 'totalAmount' | 'saleProducts'> & {
  saleProducts: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
  }>;
};

export class Sale {
  private readonly totalAmount: SaleTotalAmount;

  constructor(
    private id: SaleId,
    private date: SaleDate,
    private userId: SaleUserId,
    private saleProducts: Array<SaleProduct>,
  ) {
    this.totalAmount = new SaleTotalAmount(
      this.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.toPrimitives().totalAmount,
        0,
      ),
    );
  }

  static create(params: PrimitivesCreate): Sale {
    const { id, date, userId, saleProducts } = params;

    return new Sale(
      new SaleId(id),
      new SaleDate(date),
      new SaleUserId(userId),
      saleProducts.map((saleProduct) => SaleProduct.create(saleProduct)),
    );
  }

  toPrimitives(): Primitives {
    return {
      id: this.id.value,
      date: this.date.value,
      totalAmount: this.totalAmount.value,
      userId: this.userId.value,
      saleProducts: this.saleProducts.map((saleProduct) =>
        saleProduct.toPrimitives(),
      ),
    };
  }
}
