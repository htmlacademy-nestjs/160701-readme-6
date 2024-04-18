import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { UsersConfigModule } from '@project/config';

@Module({
  imports: [BlogUserModule, AuthenticationModule, UsersConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
