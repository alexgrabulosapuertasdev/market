import { ProductResponse } from '../models/interfaces/Product';

export async function findAll(filter?: string): Promise<ProductResponse[]> {
  return fetch(`http://localhost:3000/product?filter=${filter ?? ''}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error: ', error));
}
