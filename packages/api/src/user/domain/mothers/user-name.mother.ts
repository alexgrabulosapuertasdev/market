import { faker } from '@faker-js/faker';
import { UserName } from '../aggregates/user-name';

export class UserNameMother {
  static create(value?: string): UserName {
    return new UserName(value ?? faker.person.firstName());
  }
}
