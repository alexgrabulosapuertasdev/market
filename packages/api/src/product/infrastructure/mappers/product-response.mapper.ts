import { ProductResponseDTO } from '../dto/product-response.dto';
import { Product } from '../../domain/aggregates/product';

export function productResponseMapper(product: Product): ProductResponseDTO {
  const {
    image: { data, ...image },
    ...item
  } = product.toPrimitives();

  return {
    ...item,
    image: {
      ...image,
      base64: data.toString('base64'),
    },
  };
}
