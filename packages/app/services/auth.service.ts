import { API_URL } from '../models/constants/api-url.constants';
import { USER_ROLE } from '../models/enums/user-role.enum';
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
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error: ', error));
}

export async function getUserRole(): Promise<{ role: USER_ROLE }> {
  return fetch(`${API_URL.AUTH}/me`, { credentials: 'include' })
    .then((res) => res.json())
    .catch((error) => console.error('Error: ', error));
}

export async function logout(): Promise<LoginResponse> {
  return fetch(`${API_URL.AUTH}/logout`, {
    method: 'post',
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error: ', error));
}
