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
    jest
      .spyOn(encryptPasswordModule, 'encryptPassword')
      .mockResolvedValue(passwordEncrypted);
    userRepository.save.mockResolvedValue(
      UserMother.create({
        ...user.toPrimitives(),
        password: passwordEncrypted,
      }),
    );

    const userResponse = await userCreate.run(request);

    expect(userRepository.save).toHaveBeenCalledWith(
      UserMother.create({
        ...user.toPrimitives(),
        password: passwordEncrypted,
      }),
    );
    expect(userResponse).toEqual({
      id: user.id.value,
      name: user.name.value,
      surnames: user.surnames.value,
      email: user.email.value,
      role: user.role.value,
    });
  });
});
