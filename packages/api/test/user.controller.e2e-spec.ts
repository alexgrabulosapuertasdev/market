import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { MariadbConfig } from '../src/database/mariadb.config';
import { USER_ROLE } from '../src/shared/enums/user.role';
import { User } from '../src/user/entity/user.entity';
import { UserModule } from '../src/user/user.module';
import { compare } from 'bcrypt';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { Repository } from 'typeorm';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test' }),
        MariadbConfig.createConnection(),
        UserModule,
      ],
    }).compile();

    userRepository = testingModule.get<Repository<User>>(
      getRepositoryToken(User),
    );

    app = testingModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.query('DELETE FROM USER;');
  });

  afterAll(async () => {
    await userRepository.query('DELETE FROM USER;');
    await app.close();
    await testingModule.close();
  });

  describe('GET /', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: randomUUID(),
          name: faker.person.firstName(),
          surnames: `${faker.person.lastName()} ${faker.person.lastName()}`,
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: USER_ROLE.ADMIN,
        },
        {
          id: randomUUID(),
          name: faker.person.firstName(),
          surnames: `${faker.person.lastName()} ${faker.person.lastName()}`,
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: USER_ROLE.ADMIN,
        },
      ];

      await userRepository.save({ ...users[0] });
      await userRepository.save({ ...users[1] });

      const { body, status } = await request(app.getHttpServer()).get('/user');

      expect(status).toBe(HttpStatus.OK);
      const response = body
        .map(({ createdAt, updatedAt, ...result }) => result)
        .sort((a, b) => (a.id > b.id ? 1 : 0));

      expect(response).toEqual(users.sort((a, b) => (a.id > b.id ? 1 : 0)));
      expect(body[0].createdAt).toBeDefined();
      expect(body[0].updatedAt).toBeDefined();
    });
  });

  describe('POST /', () => {
    it('should create a user', async () => {
      const userCreateDto = {
        name: faker.person.firstName(),
        surnames: `${faker.person.lastName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: USER_ROLE.ADMIN,
      };

      const { body, status } = await request(app.getHttpServer())
        .post('/user')
        .send(userCreateDto);

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.name).toBe(userCreateDto.name);
      expect(body.surnames).toBe(userCreateDto.surnames);
      expect(body.email).toBe(userCreateDto.email);
      expect(body.role).toBe(userCreateDto.role);
      expect(compare(userCreateDto.password, body.password)).toBeTruthy();
      expect(body.id).toBeDefined();
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
    });
  });
});
