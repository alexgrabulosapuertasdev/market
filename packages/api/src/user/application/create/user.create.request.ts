import { USER_ROLE } from '../../domain/enum/user.role';

export interface UserCreateRequest {
  id: string;
  name: string;
  surnames: string;
  email: string;
  password: string;
  role: USER_ROLE;
}
