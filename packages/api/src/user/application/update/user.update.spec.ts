import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdate } from './user.update';
import { UserRepository } from '../../domain/ports/user.repository';
import { UserMother } from '../../domain/mothers/user.mother';
import * as encryptPasswordModule from '../../domain/services/encrypt-password';

describe('UserUpdate', () => {
  let userUpdate: UserUpdate;
  let userRepository: jest.Mocked<UserRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        UserUpdate,
        {
          provide: UserRepository,
          useValue: { findOneById: jest.fn(), save: jest.fn() },
        },
      ],
    }).compile();

    userUpdate = testingModule.get<UserUpdate>(UserUpdate);
    userRepository = testingModule.get(UserRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should be defined', () => {
    expect(userUpdate).toBeDefined();
  });

  it('should update a user and encrypt their password', async () => {
    const user = UserMother.create();
    const newName = 'NewName';
    const passwordEncrypted = 'passwordEncrypted';
    const userUpdated = UserMother.create({
      ...user.toPrimitives(),
      name: newName,
      password: passwordEncrypted,
    });
    const encryptPasswordSpyOn = jest.spyOn(
      encryptPasswordModule,
      'encryptPassword',
    );
    encryptPasswordSpyOn.mockResolvedValue(passwordEncrypted);
    userRepository.findOneById.mockResolvedValue(user);
    userRepository.save.mockResolvedValue(userUpdated);

    const response = await userUpdate.run({
      id: user.id.value,
      name: newName,
      password: passwordEncrypted,
    });

    expect(userRepository.save).toHaveBeenCalledWith(userUpdated);
    expect(response).toEqual({
      id: user.id.value,
      name: newName,
      surnames: user.surnames.value,
      email: user.email.value,
      role: user.role.value,
    });
    expect(encryptPasswordSpyOn).toHaveBeenCalledWith(passwordEncrypted);
  });
});
