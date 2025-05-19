export interface CartUpdateRequest {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
