import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtConstants } from '../constants/jwt.constants';

export function getUserIdFromCookies(cookies: Request['cookies']): string {
  const decodedToken: any = verify(cookies.auth_token, JwtConstants.SECRET);
  const { id } = decodedToken;

  return id;
}
