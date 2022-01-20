import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.constant';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  /**
   * 리스트 데이터 추가
   * @param key 키
   * @param value 값
   * @returns
   */
  async addListData(key: string, value: any): Promise<number> {
    return this.redisClient.rpush(key, value);
  }

  /**
   * 리스트 데이터 가져오기
   * @param key 키
   * @param position 인덱스 포지션 [start, end] *default: all
   * @returns
   */
  async getListData(
    key: string,
    position?: [number, number],
  ): Promise<string[]> {
    if (position) {
      return this.redisClient.lrange(key, position[0], position[1]);
    } else {
      return this.redisClient.lrange(key, 0, -1);
    }
  }

  /**
   * 리스트 데이터 길이 가져오기
   * @param key 키
   * @returns 리스트 데이터 길이
   */
  async getListLen(key: string): Promise<number> {
    return this.redisClient.llen(key);
  }

  /**
   * 리스트 데이터 꺼내오기 (데이터 반환 및 제거)
   * @param key 키
   * @param count 뽑아오는 데이터 갯수
   * @returns 데이터
   */
  async popListData(key: string, count: number): Promise<any[]> {
    return this.redisClient.rpop(key, count);
  }
}
