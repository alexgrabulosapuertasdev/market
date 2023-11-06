import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  create(userCreateDto: UserCreateDto): Promise<User> {
    return this.userRepository.insert(userCreateDto);
  }
}
