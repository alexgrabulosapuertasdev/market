import { ProductResponse } from '../models/interfaces/Product';

const API_URL_PRODUCT = 'http://localhost:3000/product';

export async function findAll(filter?: string): Promise<ProductResponse[]> {
  return fetch(`${API_URL_PRODUCT}?filter=${filter ?? ''}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error: ', error));
}

export async function findOneById(id: string): Promise<ProductResponse> {
  return fetch(`${API_URL_PRODUCT}/${id}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error: ', error));
}
