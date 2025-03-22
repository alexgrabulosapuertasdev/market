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
        { provide: UserRepository, useValue: { findOneByEmail: jest.fn() } },
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
    const { email, id, name, password, role } = user.toPrimitives();
    const credentials: AuthSignInRequest = { email, password };
    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);
    jest.spyOn(compareHashModule, 'compareHash').mockResolvedValue(true);

    const result = await authSignIn.run(credentials);

    expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
      credentials.email,
    );
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      email,
      id,
      name,
      role,
    });
    expect(result).toEqual({ token });
  });
});
