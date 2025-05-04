import { USER_ROLE } from '../../domain/enum/user.role';

export interface UserResponseDto {
  id: string;
  name: string;
  surnames: string;
  email: string;
  role: USER_ROLE;
}
