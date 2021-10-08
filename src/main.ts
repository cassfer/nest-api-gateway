import * as momentTimeZone from 'moment-timezone';

import { AppModule } from './app.module';
import {CustomHttpExceptionFilter} from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { NestFactory } from '@nestjs/core';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomHttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  Date.prototype.toJSON = function (): any {
    return momentTimeZone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };
  await app.listen(3000);
}
bootstrap();
