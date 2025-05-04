import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

@Injectable()
export class UserRedisConfig {
  static createConnection(): CacheModuleAsyncOptions {
    return {
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env['USER_REDIS_HOST'],
            port: Number(process.env['USER_REDIS_PORT']),
          },
          password: process.env['USER_REDIS_PASSWORD'],
        });

        return {
          store: () => store,
        };
      },
    };
  }
}
