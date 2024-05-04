import { Module } from '@nestjs/common';
import { FileVaultConfigModule } from '@project/config';

@Module({
  imports: [FileVaultConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
