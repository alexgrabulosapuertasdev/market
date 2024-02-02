import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class UserDelete {
  constructor(private readonly userRepository: UserRepository) {}

  run(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
