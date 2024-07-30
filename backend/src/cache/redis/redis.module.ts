import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';

const cacheModule = CacheModule.register({
    useFactory: async () => ({
        store: redisStore,
        host: 'localhost', // env에서 정의함
        port: 6379, // env에서 정의함
        ttl: 1000, // 캐시 유지 시간
    }),
});

@Module({
    imports: [cacheModule],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisCacheModule {}
