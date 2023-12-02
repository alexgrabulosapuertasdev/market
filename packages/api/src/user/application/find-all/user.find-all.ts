import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';
import { UserResponse } from '../../domain/interface/user.response';

@Injectable()
export class UserFindAll {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();

    return users.map((userResonse) => {
      const user = userResonse.toPrimitives();

      delete user.password;

      return user;
    });
  }
}
