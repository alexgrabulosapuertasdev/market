export interface CartUpdateDTO {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
