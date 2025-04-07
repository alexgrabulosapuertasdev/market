import { API_URL } from '../models/constants/api-url.constants';
import { UserCreate, UserResponse } from '../models/interfaces/User';

export async function createUser(user: UserCreate): Promise<UserResponse> {
  return fetch(`${API_URL.USER}`, {
    method: 'post',
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error: ', error));
}
