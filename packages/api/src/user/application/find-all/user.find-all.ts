import { Injectable } from '@nestjs/common';
import { User } from '../../domain/aggregates/user';
import { UserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class UserFindAll {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
