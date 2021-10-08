import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('api/v1/jogadores')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  criarJogador(@Body() criarJogadorDto: CriarJogadorDto){
    this.clientAdminBackend.send('criar-jogador', criarJogadorDto);
  }


  @Get()
  consultaJogador(@Query('email') email: string): Observable<any>{
    return this.clientAdminBackend.send('consultar-jogadores', email ? email : '')
  }

}

