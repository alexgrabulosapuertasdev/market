import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

@Injectable()
export class RedisConfig {
  static createConnection(): CacheModuleAsyncOptions {
    return {
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env['REDIS_HOST'],
            port: Number(process.env['REDIS_PORT']),
          },
          password: process.env['REDIS_PASSWORD'],
        });

        return {
          store: () => store,
        };
      },
    };
  }
}
