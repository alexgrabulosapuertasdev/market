import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './persistence/entity/user-typeorm.entity';
import { UserController } from './user.controller';
import { UserMariadbConfig } from './persistence/user-mariadb.config';
import { UserRedisConfig } from './persistence/user-redis.config';
import { UserRedisRepository } from './persistence/user-redis.repository';
import { UserTypeormRepository } from './persistence/user-typeorm.repository';
import { UserFindAll } from '../application/find-all/user.find-all';
import { UserCreate } from '../application/create/user.create';
import { UserRepository } from '../domain/ports/user.repository';
import { UserDelete } from '../application/delete/user.delete';
import { UserUpdate } from '../application/update/user.update';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([UserTypeorm]),
    UserMariadbConfig.createConnection(),
    CacheModule.registerAsync(UserRedisConfig.createConnection()),
  ],
  controllers: [UserController],
  providers: [
    UserCreate,
    UserDelete,
    UserFindAll,
    UserUpdate,
    { provide: UserRepository, useClass: UserTypeormRepository },
    UserRedisRepository,
  ],
  exports: [
    { provide: UserRepository, useClass: UserTypeormRepository },
    UserRedisRepository,
  ],
})
export class UserModule {}
