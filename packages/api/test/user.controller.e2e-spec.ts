import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AuthSignIn } from '../src/auth/application/sign-in/auth.sign-in';
import { UserMother } from '../src/user/domain/mothers/user.mother';
import { UserTypeorm } from '../src/user/infrastructure/persistence/entity/user-typeorm.entity';
import { UserModule } from '../src/user/infrastructure/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let userRepository: Repository<UserTypeorm>;

  beforeAll(async () => {
    const authSignInMock = {
      run: jest.fn().mockResolvedValue({ token: 'token' }),
    };
    testingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(AuthSignIn)
      .useValue(authSignInMock)
      .compile();

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

  describe('GET /', () => {
    it('should return an array of users', async () => {
      const users = [UserMother.create(), UserMother.create()]
        .map((user) => user.toPrimitives())
        .sort((a, b) => a.id.localeCompare(b.id));

      await userRepository.save({ ...users[0] });
      await userRepository.save({ ...users[1] });

      const { body, status } = await request(app.getHttpServer()).get('/user');

      expect(status).toBe(HttpStatus.OK);

      const response = body.sort((a, b) => a.id.localeCompare(b.id));
      expect(response).toEqual(users.map(({ password, ...user }) => user));
    });
  });

  describe('POST /', () => {
    it('should create a user', async () => {
      const userCreateDto = UserMother.create().toPrimitives();

      const { body, status } = await request(app.getHttpServer())
        .post('/user')
        .send(userCreateDto);

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.name).toBe(userCreateDto.name);
      expect(body.surnames).toBe(userCreateDto.surnames);
      expect(body.email).toBe(userCreateDto.email);
      expect(body.role).toBe(userCreateDto.role);
      expect(body.id).toBeDefined();
      expect(body.password).not.toBeDefined();
    });
  });

  describe('PUT /:id', () => {
    it('should update a user', async () => {
      const user = UserMother.create().toPrimitives();
      await userRepository.save(user);

      const { body, status } = await request(app.getHttpServer()).put(
        `/user/${user.id}`,
      );

      expect(status).toBe(HttpStatus.OK);
      expect(body.name).toBe(user.name);
      expect(body.surnames).toBe(user.surnames);
      expect(body.email).toBe(user.email);
      expect(body.role).toBe(user.role);
      expect(body.id).toBeDefined();
      expect(body.password).not.toBeDefined();
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a user', async () => {
      const user = UserMother.create();

      await userRepository.save(user.toPrimitives());

      const { status } = await request(app.getHttpServer()).delete(
        `/user/${user.id.value}`,
      );

      expect(await userRepository.find()).toEqual([]);
      expect(status).toBe(HttpStatus.OK);
    });
  });
});
