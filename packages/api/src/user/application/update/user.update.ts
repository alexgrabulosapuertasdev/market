import { Injectable } from '@nestjs/common';
import { UserUpdateRequest } from './user.update.request';
import { User } from '../../domain/aggregates/user';
import { UserRepository } from '../../domain/ports/user.repository';
import { encryptPassword } from '../../domain/services/encrypt-password';

@Injectable()
export class UserUpdate {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userUpdateRequest: UserUpdateRequest): Promise<User> {
    const { id, password } = userUpdateRequest;

    if (password) {
      userUpdateRequest.password = await encryptPassword(password);
    }

    const userToUpdate = await this.userRepository.findOneById(id);
    const userUpdated = User.create({
      ...userToUpdate.toPrimitives(),
      ...userUpdateRequest,
    });

    const userResponse = await this.userRepository.save(userUpdated);

    return userResponse;
  }
}
