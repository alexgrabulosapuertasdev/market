import { faker } from '@faker-js/faker';
import { UserEmail } from '../aggregates/user-email';

export class UserEmailMother {
  static create(value?: string): UserEmail {
    return new UserEmail(value ?? faker.internet.email());
  }
}
