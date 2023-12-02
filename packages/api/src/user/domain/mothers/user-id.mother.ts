import { randomUUID } from 'crypto';
import { UserId } from '../aggregates/user-id';

export class UserIdMother {
  static create(value?: string): UserId {
    return new UserId(value ?? randomUUID());
  }
}
