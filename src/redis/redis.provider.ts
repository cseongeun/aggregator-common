import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constant';

export const redisProviders: Provider[] = [
  {
    useFactory: (): Redis.Redis => {
      return new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      });
    },
    provide: REDIS_CLIENT,
  },
];
