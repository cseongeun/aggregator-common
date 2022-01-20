import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Ok, Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.constant';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  /**
   * Redis 데이터 가져오기
   * @param key 키
   * @returns 데이터
   */
  async getData(key: string): Promise<any> {
    return this.redisClient.get(key);
  }

  /**
   * Redis 데이터 추가
   * @param key 키
   * @param value 데이터
   */
  async setData(key: string, value: any): Promise<Ok> {
    return this.redisClient.set(key, value);
  }

  // /**
  //  * Redis 데이터 푸시
  //  * @param key 키
  //  * @param value 데이터
  //  */
  // async pushData(key: string, value: any): Promise<any[]> {
  //   const prevData = await this.cacheManager.get(key);

  //   if (isUndefined(prevData)) {
  //     return this.cacheManager.set(key, [value]);
  //   } else {
  //     const newData = [...(prevData as any[]), value];
  //     return this.cacheManager.set(key, newData, { ttl: 0 });
  //   }
  // }

  // /**
  //  * Redis 데이터 삭제
  //  * @param key 키
  //  */
  // async delData(key: string): Promise<void> {
  //   return this.cacheManager.del(key);
  // }
}
