import { USER_ROLE } from '../../enum/user-role.enum';

export interface UserResponse {
  id: string;
  name: string;
  surnames: string;
  email: string;
  role: USER_ROLE;
}
