import { UserEmail } from './user-email';
import { UserId } from './user-id';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import { UserSurnames } from './user-surnames';
import { USER_ROLE } from '../enum/user.role';

interface Primitives {
  id: string;
  name: string;
  surnames: string;
  email: string;
  password: string;
  role: USER_ROLE;
}

export class User {
  constructor(
    readonly id: UserId,
    readonly name: UserName,
    readonly surnames: UserSurnames,
    readonly email: UserEmail,
    readonly password: UserPassword,
    readonly role: UserRole,
  ) {}

  static create(params: Primitives): User {
    const { id, name, surnames, email, password, role } = params;

    return new User(
      new UserId(id),
      new UserName(name),
      new UserSurnames(surnames),
      new UserEmail(email),
      new UserPassword(password),
      new UserRole(role),
    );
  }

  toPrimitives(): Primitives {
    return {
      id: this.id.value,
      name: this.name.value,
      surnames: this.surnames.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
    };
  }
}
