import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthSignIn } from './auth.sign-in';
import { AuthSignInRequest } from './auth.sign-in.request';
import { UserMother } from '../../../user/domain/mothers/user.mother';
import { UserRepository } from '../../../user/domain/ports/user.repository';
import * as compareHashModule from '../../../shared/domain/encrypt/encrypt';

describe('AuthSignIn', () => {
  let authSignIn: AuthSignIn;
  let testingModule: TestingModule;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AuthSignIn,
        { provide: UserRepository, useValue: { findOneByName: jest.fn() } },
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
      ],
    }).compile();

    authSignIn = testingModule.get<AuthSignIn>(AuthSignIn);
    userRepository = testingModule.get<UserRepository>(UserRepository);
    jwtService = testingModule.get<JwtService>(JwtService);
  });

  it('should return a token when credentials are valid', async () => {
    const token = 'token';
    const user = UserMother.create();
    const { id, name, password } = user.toPrimitives();
    const credentials: AuthSignInRequest = { name, password };
    jest.spyOn(userRepository, 'findOneByName').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);
    jest.spyOn(compareHashModule, 'compareHash').mockResolvedValue(true);

    const result = await authSignIn.run(credentials);

    expect(userRepository.findOneByName).toHaveBeenCalledWith(credentials.name);
    expect(jwtService.signAsync).toHaveBeenCalledWith({ id, name });
    expect(result).toEqual({ token });
  });
});
