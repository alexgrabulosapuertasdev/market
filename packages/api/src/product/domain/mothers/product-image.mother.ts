import { faker } from '@faker-js/faker';
import { ProductImage } from '../aggregates/product-image';

interface Params {
  originalname: string;
  mimetype: string;
  size: number;
  base64: string;
}

export class ProductImageMother {
  static create(value?: Params): ProductImage {
    const primitives: Params = {
      originalname: faker.commerce.productName(),
      mimetype: 'image/jpeg',
      size: faker.number.int(),
      base64: faker.image.dataUri({ type: 'svg-base64' }),
      ...value,
    };

    return new ProductImage(primitives);
  }
}
