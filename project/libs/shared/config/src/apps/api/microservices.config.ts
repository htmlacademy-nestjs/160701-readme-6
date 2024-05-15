import { registerAs } from '@nestjs/config';

import { IsNumber, IsString } from 'class-validator';
import { FromEnv } from '../../lib/from-env.decorator';
import { configEnvValidator } from '../../lib/config-env-validator';

class MicrosiervicesDto {
  // Users
  @IsString()
  @FromEnv('USERS_HOST')
  usersHost!: string;

  @IsNumber()
  @FromEnv('USERS_PORT')
  usersPort!: number;

  @IsString()
  @FromEnv('USERS_PREFIX')
  usersPrefix!: string;
  // Blog
  @IsString()
  @FromEnv('BLOG_HOST')
  blogHost!: string;

  @IsNumber()
  @FromEnv('BLOG_PORT')
  blogPort!: number;

  @IsString()
  @FromEnv('BLOG_PREFIX')
  blogPrefix!: string;

  // FileVault
  @IsString()
  @FromEnv('FILE_VAULT_HOST')
  fileVaultHost!: string;

  @IsNumber()
  @FromEnv('FILE_VAULT_PORT')
  fileVaultPort!: number;

  @IsString()
  @FromEnv('FILE_VAULT_PREFIX')
  fileVaultPrefix!: string;
}

export const microservicesConfig = registerAs(
  'microservices',
  configEnvValidator(MicrosiervicesDto)
);
