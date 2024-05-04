import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoConfig } from '../../configurations/mongo/mongo.config';
import { appFileVaultConfig } from './app.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appFileVaultConfig, mongoConfig],
      envFilePath: 'apps/file-vault/.env',
    }),
  ],
})
export class FileVaultConfigModule {}
