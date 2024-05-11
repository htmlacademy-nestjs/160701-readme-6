import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { configEnvValidator } from '../../lib/config-env-validator';
import { FromEnv } from '../../lib/from-env.decorator';

export class PasswordTokenDto {
  @IsString()
  @FromEnv('PASSWORD_TOKEN_EXPIRES_IN')
  public passwordTokenExpiresIn!: string;
}

export const passwordTokenConfig = registerAs(
  'passwordToken',
  configEnvValidator(PasswordTokenDto)
);
