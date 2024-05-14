import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@project/blog-user';
import { HasherModule } from '../hasher-module/hasher.module';
import { AuthService } from './authentication.interface';
import { AuthenticationLoggerService } from './authentication-logger.service';
import { JwtConfigModule } from '@project/config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { NotifyModule } from '@project/users-notify';
import { PasswordTokenModule } from '../password-token-module/password-token.module';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
import { NotifyService } from '@project/users-notify';
import { AuthenticationNotifyService } from './authentication-notify.service';

@Module({
  imports: [
    PasswordTokenModule,
    RefreshTokenModule,
    BlogUserModule,
    HasherModule,
    JwtConfigModule.register(),
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'AuthService',
      useFactory: (
        authService: AuthenticationService,
        authNotifyService: NotifyService
      ): AuthService => {
        const authenticationNotifyService = new AuthenticationNotifyService(
          authService,
          authNotifyService
        );

        return new AuthenticationLoggerService(authenticationNotifyService);
      },
      inject: [AuthenticationService, NotifyService],
    },
    AuthenticationService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
})
export class AuthenticationModule {}
