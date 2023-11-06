import { USER_ROLE } from '../../shared/enums/user.role';

export interface UserCreateDto {
  name: string;
  surnames: string;
  email: string;
  password: string;
  role: USER_ROLE;
}
