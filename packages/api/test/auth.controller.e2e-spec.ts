import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AuthModule } from '../src/auth/infrastructure/auth.module';
import { UserTypeorm } from '../src/user/infrastructure/persistence/entity/user-typeorm.entity';
import { UserMother } from '../src/user/domain/mothers/user.mother';
import { encryptPassword } from '../src/user/domain/services/encrypt-password';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let userRepository: Repository<UserTypeorm>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    userRepository = testingModule.get<Repository<UserTypeorm>>(
      getRepositoryToken(UserTypeorm),
    );

    app = testingModule.createNestApplication();
    app.use(cookieParser());
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
    it('should set a cookie when credentials are valid', async () => {
      const user = UserMother.create().toPrimitives();
      const passwordEncripted = await encryptPassword(user.password);

      await userRepository.save({
        ...user,
        password: passwordEncripted,
      });

      const { body, headers, status } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: user.password });

      expect(status).toBe(HttpStatus.CREATED);
      expect(body).toEqual({ message: 'Login successful' });
      const cookies = headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain('auth_token');
    });
  });

  describe('GET /me', () => {
    it('should return user role with valid cookie', async () => {
      const user = UserMother.create().toPrimitives();
      const password = user.password;
      const passwordEncripted = await encryptPassword(password);

      await userRepository.save({
        ...user,
        password: passwordEncripted,
      });

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password });

      const cookie = loginResponse.headers['set-cookie'];

      const { body, status } = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Cookie', cookie);

      expect(status).toBe(HttpStatus.OK);
      expect(body).toEqual({ role: user.role });
    });
  });

  describe('POST /logout', () => {
    it('should clear cookie', async () => {
      const { headers, status } = await request(app.getHttpServer()).post(
        '/auth/logout',
      );

      expect(status).toBe(HttpStatus.CREATED);
      const cookies = headers['set-cookie'];
      expect(cookies[0]).toMatch(/^auth_token=.+/);
    });
  });
});
