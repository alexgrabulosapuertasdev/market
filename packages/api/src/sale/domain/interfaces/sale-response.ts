export interface SaleResponse {
  id: string;
  date: Date;
  totalAmount: number;
  user: {
    id: string;
    name: string;
  };
  saleProducts: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    totalAmount: number;
    productId: string;
  }>;
}
