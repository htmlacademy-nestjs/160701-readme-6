import { Logger, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@project/blog-user';
import { HasherModule } from '../hasher-module/hasher.module';
import { AuthService } from './authentication.interface';
import { AuthenticationLoggerService } from './authentication-logger.service';

@Module({
  imports: [BlogUserModule, HasherModule],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'AuthService',
      useFactory: (
        authService: AuthenticationService
      ): AuthService => {
        return new AuthenticationLoggerService(authService);
      },
      inject: [AuthenticationService],
    },
    AuthenticationService,
  ],
})
export class AuthenticationModule {}
