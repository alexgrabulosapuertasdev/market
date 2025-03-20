export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: {
    originalname: string;
    mimetype: string;
    size: number;
    base64: string;
  };
}

export interface ProductCart extends ProductResponse {
  quantity: number;
}
