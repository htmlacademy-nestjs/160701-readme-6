import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { UsersConfigModule, getMongooseOptions } from '@project/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    UsersConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
