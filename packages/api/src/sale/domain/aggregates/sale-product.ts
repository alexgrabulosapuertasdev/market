import { PRODUCT_CATEGORY } from 'src/product/domain/enum/product-category';
import { SaleProductImage } from './sale-product-image';
import { SaleProductName } from './sale-product-name';
import { SaleProductPrice } from './sale-product-price';
import { SaleProductProductId } from './sale-product-product-id';
import { SaleProductQuantity } from './sale-product-quantity';
import { SaleProductTotalAmount } from './sale-product-total-amount';
import { SaleProductCategory } from './sale-product-category';
import { SaleProductDescription } from './sale-product-description';

interface Primitives {
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
  totalAmount: number;
}

export class SaleProduct {
  private readonly totalAmount: SaleProductTotalAmount;

  constructor(
    private productId: SaleProductProductId,
    private name: SaleProductName,
    private description: SaleProductDescription,
    private category: SaleProductCategory,
    private price: SaleProductPrice,
    private quantity: SaleProductQuantity,
    private image: SaleProductImage,
  ) {
    this.totalAmount = new SaleProductTotalAmount(
      this.price.value * this.quantity.value,
    );
  }

  static create(params: Omit<Primitives, 'totalAmount'>): SaleProduct {
    const { productId, name, description, category, price, quantity, image } =
      params;

    return new SaleProduct(
      new SaleProductProductId(productId),
      new SaleProductName(name),
      new SaleProductDescription(description),
      new SaleProductCategory(category),
      new SaleProductPrice(price),
      new SaleProductQuantity(quantity),
      new SaleProductImage(image),
    );
  }

  toPrimitives(): Primitives {
    return {
      productId: this.productId.value,
      name: this.name.value,
      description: this.description.value,
      category: this.category.value,
      price: this.price.value,
      quantity: this.quantity.value,
      image: this.image.value,
      totalAmount: this.totalAmount.value,
    };
  }
}
