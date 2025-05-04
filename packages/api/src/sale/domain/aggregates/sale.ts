import { PRODUCT_CATEGORY } from 'src/product/domain/enum/product-category';
import { SaleDate } from './sale-date';
import { SaleId } from './sale-id';
import { SaleProduct } from './sale-product';
import { SaleTotalAmount } from './sale-total-amount';
import { SaleUserId } from './sale-user-id';

interface Primitives {
  id: string;
  date: Date;
  totalAmount: number;
  userId: string;
  products: Array<{
    productId: string;
    name: string;
    description: string;
    category: PRODUCT_CATEGORY;
    price: number;
    quantity: number;
    totalAmount: number;
    image: {
      originalname: string;
      mimetype: string;
      size: number;
      data: Buffer;
    };
  }>;
}

type PrimitivesCreate = Omit<Primitives, 'totalAmount' | 'products'> & {
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
};

export class Sale {
  private readonly totalAmount: SaleTotalAmount;

  constructor(
    private id: SaleId,
    private date: SaleDate,
    private userId: SaleUserId,
    private products: Array<SaleProduct>,
  ) {
    this.totalAmount = new SaleTotalAmount(
      this.products.reduce(
        (acc, product) => acc + product.toPrimitives().totalAmount,
        0,
      ),
    );
  }

  static create(params: PrimitivesCreate): Sale {
    const { id, date, userId, products } = params;

    return new Sale(
      new SaleId(id),
      new SaleDate(date),
      new SaleUserId(userId),
      products.map((product) => SaleProduct.create(product)),
    );
  }

  toPrimitives(): Primitives {
    return {
      id: this.id.value,
      date: this.date.value,
      totalAmount: this.totalAmount.value,
      userId: this.userId.value,
      products: this.products.map((product) => product.toPrimitives()),
    };
  }
}
