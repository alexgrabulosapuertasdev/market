export interface SaleCreateDto {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
