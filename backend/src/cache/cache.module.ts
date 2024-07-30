import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        store: redisStore,
        host: ConfigService.get('REDIS_HOST'),
        port: ConfigService.get('REDIS_PORT'),
        ttl: ConfigService.get('CACHE_TTL'),
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheModule, CacheService],
})
export class CacheConfigModule {}
