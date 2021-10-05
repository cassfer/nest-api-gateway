import { Controller, Get, Logger } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return 'hello world';
  } 
  
}
