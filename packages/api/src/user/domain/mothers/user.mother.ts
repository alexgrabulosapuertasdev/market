import { UserEmailMother } from './user-email.mother';
import { UserIdMother } from './user-id.mother';
import { UserNameMother } from './user-name.mother';
import { UserPasswordMother } from './user-password.mother';
import { UserRoleMother } from './user-role.mother';
import { UserSurnamesMother } from './user-surnames.mother';
import { User } from '../aggregates/user';
import { USER_ROLE } from '../enum/user.role';

interface UserParams {
  id: string;
  name: string;
  surnames: string;
  email: string;
  password: string;
  role: USER_ROLE;
}

export class UserMother {
  static create(params?: Partial<UserParams>): User {
    const primitives: UserParams = {
      id: UserIdMother.create().value,
      name: UserNameMother.create().value,
      surnames: UserSurnamesMother.create().value,
      email: UserEmailMother.create().value,
      password: UserPasswordMother.create().value,
      role: UserRoleMother.create().value,
      ...params,
    };

    return User.create(primitives);
  }
}
