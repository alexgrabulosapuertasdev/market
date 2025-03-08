import { ProductResponse } from '../interfaces/Product';

export class ProductMother {
  static createProductResponse(
    value?: Partial<ProductResponse>,
  ): ProductResponse {
    const product: ProductResponse = {
      id: '1',
      name: 'Product Name',
      description: 'Product Description',
      category: 'Product Category',
      price: 100,
      stock: 10,
      image: {
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 12345,
        base64: 'testBase64String',
      },
      ...value,
    };

    return product;
  }
}
