import { faker } from '@faker-js/faker';
import { ProductImage } from '../aggregates/product-image';

interface Params {
  originalname: string;
  mimetype: string;
  size: number;
  data: Buffer;
}

export class ProductImageMother {
  static create(value?: Params): ProductImage {
    const primitives: Params = {
      originalname: faker.commerce.productName(),
      mimetype: 'image/jpeg',
      size: faker.number.int(),
      data: Buffer.from(faker.image.avatar()),
      ...value,
    };

    return new ProductImage(primitives);
  }
}
