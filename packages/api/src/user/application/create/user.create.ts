import { Injectable } from '@nestjs/common';
import { UserCreateRequest } from './user.create.request';
import { User } from '../../domain/aggregates/user';
import { UserRepository } from '../../domain/ports/user.repository';
import { encryptPassword } from '../../domain/services/encrypt-password';

@Injectable()
export class UserCreate {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userCreateRequest: UserCreateRequest): Promise<User> {
    userCreateRequest.password = await encryptPassword(
      userCreateRequest.password,
    );

    const userResponse = await this.userRepository.save(
      User.create(userCreateRequest),
    );

    return userResponse;
  }
}
