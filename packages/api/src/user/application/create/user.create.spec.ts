import { Test, TestingModule } from '@nestjs/testing';
import { UserCreate } from './user.create';
import { UserCreateRequest } from './user.create.request';
import { UserMother } from '../../domain/mothers/user.mother';
import { UserRepository } from '../../domain/ports/user.repository';
import * as encryptPasswordModule from '../../domain/services/encrypt-password';

describe('UserCreate', () => {
  let userCreate: UserCreate;
  let userRepository: jest.Mocked<UserRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        UserCreate,
        { provide: UserRepository, useValue: { save: jest.fn() } },
      ],
    }).compile();

    userCreate = testingModule.get<UserCreate>(UserCreate);
    userRepository = testingModule.get(UserRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should create a user and encrypt their password', async () => {
    const user = UserMother.create();
    const request: UserCreateRequest = { ...user.toPrimitives() };
    const passwordEncrypted = 'passwordEncrypted';
    const userWithPasswordEncrypted = UserMother.create({
      ...user.toPrimitives(),
      password: passwordEncrypted,
    });
    jest
      .spyOn(encryptPasswordModule, 'encryptPassword')
      .mockResolvedValue(passwordEncrypted);
    userRepository.save.mockResolvedValue(userWithPasswordEncrypted);

    const userResponse = await userCreate.run(request);

    expect(userRepository.save).toHaveBeenCalledWith(userWithPasswordEncrypted);
    expect(userResponse).toEqual(userWithPasswordEncrypted);
  });
});
