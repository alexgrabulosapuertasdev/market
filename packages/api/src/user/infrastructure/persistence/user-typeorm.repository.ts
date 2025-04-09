import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeorm } from './entity/user-typeorm.entity';
import { UserRedisRepository } from './user-redis.repository';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/aggregates/user';
import { NotFound } from '../../../shared/domain/exception/not-found';

@Injectable()
export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeorm)
    private readonly userRepository: Repository<UserTypeorm>,
    private readonly userRedisService: UserRedisRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const usersCached = await this.userRedisService.getCacheUserAll();

    if (usersCached) {
      return usersCached.map((user: UserTypeorm) => User.create(user));
    }

    const users = await this.userRepository.find();

    this.userRedisService.saveCacheUserAll(users);

    return users.map((user) => User.create(user));
  }

  async findOneById(id: string): Promise<User> {
    const userCached = await this.userRedisService.getCacheUserOneById(id);

    if (userCached) {
      return User.create(userCached);
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFound('There are no users with this id');
    }

    this.userRedisService.saveCacheUserOne(user);

    return User.create(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const userCached = await this.userRedisService.getCacheUserOneByEmail(
      email,
    );

    if (userCached) {
      return User.create(userCached);
    }
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFound('There are no users with this email');
    }

    this.userRedisService.saveCacheUserOne(user);

    return User.create(user);
  }

  async save(user: User): Promise<User> {
    const userResponse = await this.userRepository.save(user.toPrimitives());

    this.userRedisService.addCacheUserAll(userResponse);

    return User.create(userResponse);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id });

    await this.userRedisService.deleteCacheKeys(id);

    const usersCached = await this.userRedisService.getCacheUserAll();
    if (usersCached) {
      this.userRedisService.saveCacheUserAll(
        usersCached.filter((user) => user.id !== id),
      );
    }
  }
}
