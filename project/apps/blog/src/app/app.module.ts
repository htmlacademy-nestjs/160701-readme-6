import { Module } from '@nestjs/common';
import { BlogConfigModule } from '@project/config';

@Module({
  imports: [BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
