import { faker } from '@faker-js/faker';
import { SaleProductImage } from '../aggregates/sale-product-image';

interface Params {
  originalname: string;
  mimetype: string;
  size: number;
  data: Buffer;
}

export class SaleProductImageMother {
  static create(value?: Params): SaleProductImage {
    const primitives: Params = {
      originalname: faker.commerce.productName(),
      mimetype: 'image/jpeg',
      size: faker.number.int(),
      data: Buffer.from(faker.image.avatar()),
      ...value,
    };

    return new SaleProductImage(primitives);
  }
}
