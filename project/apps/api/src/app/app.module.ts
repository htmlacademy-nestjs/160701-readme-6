import { Module } from '@nestjs/common';
import { ApiConfigModule } from '@project/config';
import {
  HTTP_CLIENT_MAX_REDIRECTS,
  HTTP_CLIENT_TIMEOUT
} from './app.config'
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
