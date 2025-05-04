import { UserResponseDto } from '../dto/user-response.dto';
import { User } from '../../domain/aggregates/user';

export function userResponseMapper(user: User): UserResponseDto {
  const primitives = user.toPrimitives();

  delete primitives.password;

  return primitives;
}
