import { API_URL } from '../models/constants/api-url.constants';
import { LoginCredentials, LoginResponse } from '../models/interfaces/Auth';

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return fetch(`${API_URL.AUTH}/login`, {
    method: 'post',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error: ', error));
}
