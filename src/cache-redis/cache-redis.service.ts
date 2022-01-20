import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { isUndefined } from '@seongeun/aggregator-util/lib/type';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheRedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  /**
   * Redis 데이터 가져오기
   * @param key 키
   * @returns 데이터
   */
  async getData(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  /**
   * Redis 데이터 추가
   * @param key 키
   * @param value 데이터
   */
  async addData(key: string, value: any): Promise<void> {
    return this.cacheManager.set(key, value, { ttl: 0 });
  }

  /**
   * Redis 데이터 푸시
   * @param key 키
   * @param value 데이터
   */
  async pushData(key: string, value: any): Promise<any[]> {
    const prevData = await this.cacheManager.get(key);

    if (isUndefined(prevData)) {
      return this.cacheManager.set(key, [value]);
    } else {
      const newData = [...(prevData as any[]), value];
      return this.cacheManager.set(key, newData, { ttl: 0 });
    }
  }

  /**
   * Redis 데이터 삭제
   * @param key 키
   */
  async delData(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }
}
