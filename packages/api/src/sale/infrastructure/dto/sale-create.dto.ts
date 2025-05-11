export interface SaleCreateDto {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
