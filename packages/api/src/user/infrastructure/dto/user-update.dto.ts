import { USER_ROLE } from '../../domain/enum/user.role';

export interface UserUpdateDto {
  name?: string;
  surnames?: string;
  email?: string;
  password?: string;
  role?: USER_ROLE;
}
