import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {}
