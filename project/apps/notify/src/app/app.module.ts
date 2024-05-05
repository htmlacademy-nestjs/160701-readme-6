import { Module } from '@nestjs/common';
import { NotifyConfigModule } from '@project/config';

@Module({
  imports: [NotifyConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
