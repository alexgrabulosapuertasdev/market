import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async insert(userCreateDto: UserCreateDto): Promise<User> {
    const userCreate = {
      ...userCreateDto,
      password: await this.encryptPassword(userCreateDto.password),
      id: randomUUID(),
    };

    return this.userRepository.save(userCreate);
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt();
    const passwordHashed = await hash(password, salt);

    return passwordHashed;
  }
}
