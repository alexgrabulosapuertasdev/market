import { USER_ROLE } from '../../enum/user-role.enum';

export interface UserCreate {
  name: string;
  surnames: string;
  email: string;
  password: string;
  role: USER_ROLE;
}
