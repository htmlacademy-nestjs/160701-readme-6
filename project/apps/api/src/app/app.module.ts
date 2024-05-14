import { Module } from '@nestjs/common';
import { ApiConfigModule } from '@project/config';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { HttpModule } from '@nestjs/axios';
import { BlogController } from './controllers/blog.controlller';
import { UsersController } from './controllers/users.controller';
import { ApiService } from './service/api.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    // BlogController,
    UsersController,
  ],
  providers: [CheckAuthGuard,ApiService],
})
export class AppModule {}
