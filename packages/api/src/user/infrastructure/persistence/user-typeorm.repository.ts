import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeorm } from './entity/user-typeorm.entity';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/aggregates/user';

@Injectable()
export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeorm)
    private readonly userRepository: Repository<UserTypeorm>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((user) => User.create(user));
  }

  async save(user: User): Promise<User> {
    const userResponse = await this.userRepository.save(user.toPrimitives());

    return User.create(userResponse);
  }
}
