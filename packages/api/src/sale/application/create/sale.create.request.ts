export interface SaleCreateRequest {
  id: string;
  date: Date;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
