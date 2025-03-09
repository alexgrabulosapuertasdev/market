import { SaleProductId } from './sale-product-id';
import { SaleProductName } from './sale-product-name';
import { SaleProductPrice } from './sale-product-price';
import { SaleProductProductId } from './sale-product-product-id';
import { SaleProductQuantity } from './sale-product-quantity';
import { SaleProductTotalAmount } from './sale-product-total-amount';

interface Primitives {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  productId: string;
}

type PrimitivesCreate = Omit<Primitives, 'totalAmount'>;

export class SaleProduct {
  private readonly totalAmount: SaleProductTotalAmount;

  constructor(
    private readonly id: SaleProductId,
    private readonly name: SaleProductName,
    private readonly price: SaleProductPrice,
    private readonly quantity: SaleProductQuantity,
    private readonly productId: SaleProductProductId,
  ) {
    this.totalAmount = new SaleProductTotalAmount(
      this.price.value * this.quantity.value,
    );
  }

  static create(params: PrimitivesCreate): SaleProduct {
    const { id, name, price, quantity, productId } = params;

    return new SaleProduct(
      new SaleProductId(id),
      new SaleProductName(name),
      new SaleProductPrice(price),
      new SaleProductQuantity(quantity),
      new SaleProductProductId(productId),
    );
  }

  toPrimitives(): Primitives {
    return {
      id: this.id.value,
      name: this.name.value,
      price: this.price.value,
      quantity: this.quantity.value,
      totalAmount: this.totalAmount.value,
      productId: this.productId.value,
    };
  }
}
