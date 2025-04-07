import { API_URL } from '../models/constants/api-url.constants';
import { ProductResponse } from '../models/interfaces/Product';

export async function findAll(filter?: string): Promise<ProductResponse[]> {
  return fetch(`${API_URL.PRODUCT}?filter=${filter ?? ''}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error: ', error));
}

export async function findOneById(id: string): Promise<ProductResponse> {
  return fetch(`${API_URL.PRODUCT}/${id}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error: ', error));
}
