import { UserRole } from '../aggregates/user-role';
import { USER_ROLE } from '../enum/user.role';

export class UserRoleMother {
  static create(value?: USER_ROLE): UserRole {
    return new UserRole(value ?? USER_ROLE.ADMIN);
  }
}
