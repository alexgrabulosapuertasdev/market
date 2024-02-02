import { User } from '../aggregates/user';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract save(user: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
