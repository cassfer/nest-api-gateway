import { IsNotEmpty } from 'class-validator';

export class AtualizarJogador {
  @IsNotEmpty()
  readonly nome;
}
