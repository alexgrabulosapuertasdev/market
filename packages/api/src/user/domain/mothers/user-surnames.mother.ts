import { faker } from '@faker-js/faker';
import { UserSurnames } from '../aggregates/user-surnames';

export class UserSurnamesMother {
  static create(value?: string): UserSurnames {
    return new UserSurnames(
      value ?? `${faker.person.lastName()} ${faker.person.lastName()}`,
    );
  }
}
