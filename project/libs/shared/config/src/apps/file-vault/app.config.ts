/* eslint-disable @typescript-eslint/no-inferrable-types */
import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';
import { FromEnv } from '../../lib/from-env.decorator';
import { configEnvValidator } from '../../lib/config-env-validator';
import { BaseAppDto } from '../../configurations/app.config';

class AppDto extends BaseAppDto {
  @IsString()
  @FromEnv('UPLOAD_DIRECTORY_PATH')
  uploadDirectory: string = '/uploads';

  @IsString()
  @FromEnv('SERVE_ROOT')
  serveRoot: string = '/static';
}

export const appFileVaultConfig = registerAs(
  'application',
  configEnvValidator(AppDto)
);
