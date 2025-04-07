import { USER_ROLE } from '../enums/user-role.enum';

export interface UserResponse {
  id: string;
  name: string;
  surnames: string;
  email: string;
  role: USER_ROLE;
}

export interface UserCreate {
  name: string;
  surnames: string;
  email: string;
  password: string;
  role: USER_ROLE;
}
