export interface SaleCreateDto {
  date: Date;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
