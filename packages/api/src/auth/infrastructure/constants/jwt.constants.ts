export const JwtConstants = {
  SECRET: process.env['SECRET'] ?? 'SECRET',
  EXPIRATION_TIME: process.env['EXPIRATION_TIME'] ?? '3600S',
};
