import { genSalt, hash } from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
  const salt = await genSalt();
  const passwordHashed = await hash(password, salt);

  return passwordHashed;
}
