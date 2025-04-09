import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { UserTypeorm } from './entity/user-typeorm.entity';

const CACHE_KEY = 'USER';
const CACHE_KEY_ID = `${CACHE_KEY}_ID_`;
const CACHE_KEY_EMAIL = `${CACHE_KEY}_EMAIL_`;
const CACHE_KEY_KEYS = `${CACHE_KEY}_KEYS_`;

@Injectable()
export class UserRedisRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getCacheUserAll(): Promise<UserTypeorm[] | null> {
    const usersCached = await this.cacheManager.get<UserTypeorm[]>(CACHE_KEY);

    return usersCached;
  }

  async getCacheUserOneById(id: string): Promise<UserTypeorm | null> {
    const cacheKeyId = `${CACHE_KEY_ID}${id}`;

    return await this.cacheManager.get<UserTypeorm>(cacheKeyId);
  }

  async getCacheUserOneByEmail(email: string): Promise<UserTypeorm | null> {
    const cacheKeyEmail = `${CACHE_KEY_EMAIL}${email}`;

    return await this.cacheManager.get<UserTypeorm>(cacheKeyEmail);
  }
  async saveCacheUserAll(users: UserTypeorm[]): Promise<void> {
    users.sort((a, b) => (a.id > b.id ? 1 : -1));
    await this.cacheManager.set(CACHE_KEY, users);

    await Promise.all(users.map((user) => this.saveCacheUserOne(user)));
  }

  async saveCacheUserOne(user: UserTypeorm): Promise<void> {
    const cacheKeyId = `${CACHE_KEY_ID}${user.id}`;
    const cacheKeyEmail = `${CACHE_KEY_EMAIL}${user.email}`;

    await Promise.all([
      this.cacheManager.set(cacheKeyId, user),
      this.cacheManager.set(cacheKeyEmail, user),
      this.cacheManager.set(`${CACHE_KEY_KEYS}${user.id}`, [
        cacheKeyId,
        cacheKeyEmail,
      ]),
    ]);
  }

  async addCacheUserAll(user: UserTypeorm): Promise<void> {
    const usersCached = await this.getCacheUserAll();
    const parsedUsers = usersCached ?? [];
    const filteredUsers = parsedUsers.filter((u) => u.id !== user.id);
    filteredUsers.push(user);

    await this.cacheManager.set(CACHE_KEY, filteredUsers);
    await this.saveCacheUserOne(user);
  }

  async deleteCacheKeys(id: string): Promise<void> {
    const cacheKeyKeys = `${CACHE_KEY_KEYS}${id}`;

    const keys: string[] = await this.cacheManager.get<string[]>(cacheKeyKeys);

    if (keys?.length) {
      for (const key of keys) {
        await this.cacheManager.del(key);
      }
      await this.cacheManager.del(cacheKeyKeys);
    }
  }
}
