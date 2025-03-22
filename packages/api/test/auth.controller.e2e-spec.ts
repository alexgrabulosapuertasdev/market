import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AuthModule } from '../src/auth/infrastructure/auth.module';
import { UserTypeorm } from '../src/user/infrastructure/persistence/entity/user-typeorm.entity';
import { MariadbConfig } from '../src/shared/infrastructure/persistence/mariadb.config';
import { UserMother } from '../src/user/domain/mothers/user.mother';
import { encryptPassword } from '../src/user/domain/services/encrypt-password';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let userRepository: Repository<UserTypeorm>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test' }),
        MariadbConfig.createConnection(),
        AuthModule,
      ],
    }).compile();

    userRepository = testingModule.get<Repository<UserTypeorm>>(
      getRepositoryToken(UserTypeorm),
    );

    app = testingModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.query('DELETE FROM user;');
  });

  afterAll(async () => {
    await userRepository.query('DELETE FROM user;');
    await app.close();
    await testingModule.close();
  });

  describe('POST /login', () => {
    it('should return a token when credentials are valid', async () => {
      const user = UserMother.create().toPrimitives();
      const passwordEncripted = await encryptPassword(user.password);

      await userRepository.save({
        ...user,
        password: passwordEncripted,
      });

      const { body, status } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: user.password });

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.token).toBeDefined();
    });
  });
});
