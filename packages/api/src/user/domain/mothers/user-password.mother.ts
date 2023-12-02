import { faker } from '@faker-js/faker';
import { UserPassword } from '../aggregates/user-password';

export class UserPasswordMother {
  static create(value?: string): UserPassword {
    return new UserPassword(value ?? faker.internet.password());
  }
}
