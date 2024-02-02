import { Test, TestingModule } from '@nestjs/testing';
import { UserDelete } from './user.delete';
import { UserIdMother } from '../../domain/mothers/user-id.mother';
import { UserRepository } from '../../domain/ports/user.repository';

describe('UserDelete', () => {
  let userDelete: UserDelete;
  let userRepository: jest.Mocked<UserRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        UserDelete,
        { provide: UserRepository, useValue: { delete: jest.fn() } },
      ],
    }).compile();

    userDelete = testingModule.get<UserDelete>(UserDelete);
    userRepository = testingModule.get(UserRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should delete a user', async () => {
    const { value: id } = UserIdMother.create();

    await userDelete.run(id);

    expect(userRepository.delete).toHaveBeenCalledWith(id);
  });
});
