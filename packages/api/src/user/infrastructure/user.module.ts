import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './persistence/entity/user-typeorm.entity';
import { UserController } from './user.controller';
import { UserTypeormRepository } from './persistence/user-typeorm.repository';
import { UserFindAll } from '../application/find-all/user.find-all';
import { UserCreate } from '../application/create/user.create';
import { UserRepository } from '../domain/ports/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeorm])],
  controllers: [UserController],
  providers: [
    UserCreate,
    UserFindAll,
    { provide: UserRepository, useClass: UserTypeormRepository },
  ],
})
export class UserModule {}
