import { Test, TestingModule } from '@nestjs/testing';
import { UserFindAll } from './user.find-all';
import { UserMother } from '../../domain/mothers/user.mother';
import { UserRepository } from '../../domain/ports/user.repository';

describe('UserFindAll', () => {
  let userFindAll: UserFindAll;
  let userRepository: jest.Mocked<UserRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        UserFindAll,
        { provide: UserRepository, useValue: { findAll: jest.fn() } },
      ],
    }).compile();

    userFindAll = testingModule.get<UserFindAll>(UserFindAll);
    userRepository = testingModule.get(UserRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should return an array of users without password', async () => {
    const users = [UserMother.create(), UserMother.create()];
    userRepository.findAll.mockResolvedValue(users);

    const response = await userFindAll.run();

    expect(response).toEqual(
      users.map((user) => {
        const userResoponse = user.toPrimitives();
        delete userResoponse.password;

        return userResoponse;
      }),
    );
  });

  it('should return an empty array if there are no users', async () => {
    userRepository.findAll.mockResolvedValue([]);

    const response = await userFindAll.run();

    expect(response).toEqual([]);
  });
});
