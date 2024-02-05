import { PRODUCT_CATEGORY } from '../enum/product-category';
import { ProductCategory } from './product-category';
import { ProductDescription } from './product-description';
import { ProductId } from './product-id';
import { ProductImageOriginalname } from './product-image-originalname';
import { ProductName } from './product-name';
import { ProductPrice } from './product-price';
import { ProductStock } from './product-stock';

interface Primitives {
  id: string;
  name: string;
  description: string;
  category: PRODUCT_CATEGORY;
  price: number;
  stock: number;
  imageOriginalname: string;
}

export class Product {
  constructor(
    private readonly id: ProductId,
    private readonly name: ProductName,
    private readonly description: ProductDescription,
    private readonly category: ProductCategory,
    private readonly price: ProductPrice,
    private readonly stock: ProductStock,
    private readonly imageOriginalname: ProductImageOriginalname,
  ) {}

  static create(params: Primitives): Product {
    const { id, name, description, category, price, stock, imageOriginalname } =
      params;

    return new Product(
      new ProductId(id),
      new ProductName(name),
      new ProductDescription(description),
      new ProductCategory(category),
      new ProductPrice(price),
      new ProductStock(stock),
      new ProductImageOriginalname(imageOriginalname),
    );
  }

  toPrimitives(): Primitives {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      category: this.category.value,
      price: this.price.value,
      stock: this.stock.value,
      imageOriginalname: this.imageOriginalname.value,
    };
  }
}
