import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeorm } from './entity/user-typeorm.entity';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/aggregates/user';
import { NotFound } from '../../../shared/domain/exception/not-found';

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

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFound('There are no users with this id');
    }

    return User.create(user);
  }

  async save(user: User): Promise<User> {
    const userResponse = await this.userRepository.save(user.toPrimitives());

    return User.create(userResponse);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
