import { registerAs } from '@nestjs/config';
import { IsNumber, IsString } from 'class-validator';
import { FromEnv } from '../../lib/from-env.decorator';
import { configEnvValidator } from '../../lib/config-env-validator';

export class RabbitDto {
  @IsString()
  @FromEnv('RABBIT_HOST')
  host!: string;

  @IsString()
  @FromEnv('RABBIT_PASSWORD')
  password!: string;

  @IsString()
  @FromEnv('RABBIT_USER')
  user!: string;

  @IsNumber()
  @FromEnv('RABBIT_PORT')
  port!: number;
}

export const rabbitConfig = registerAs('rabbit', configEnvValidator(RabbitDto));
