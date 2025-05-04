import { SaleResponseDto } from '../dto/sale-response.dto';
import { Sale } from '../../domain/aggregates/sale';

export function saleResponseMapper(sale: Sale): SaleResponseDto {
  const { products, ...primitives } = sale.toPrimitives();

  return {
    ...primitives,
    products: products.map(({ image: { data, ...image }, ...product }) => ({
      ...product,
      image: {
        ...image,
        base64: data.toString('base64'),
      },
    })),
  };
}
