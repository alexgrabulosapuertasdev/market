import { compare } from 'bcrypt';

export function compareHash(value: string, hash: string): Promise<boolean> {
  return compare(value, hash);
}
