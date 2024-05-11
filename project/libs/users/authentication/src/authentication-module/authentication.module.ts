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

@Module({
  imports: [
    PasswordTokenModule,
    BlogUserModule,
    HasherModule,
    JwtConfigModule.register(),
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'AuthService',
      useFactory: (authService: AuthenticationService): AuthService => {
        return new AuthenticationLoggerService(authService);
      },
      inject: [AuthenticationService],
    },
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
  ],
})
export class AuthenticationModule {}
