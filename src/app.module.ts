import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },],
})
export class AppModule {}
