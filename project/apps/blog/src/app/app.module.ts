import { Module } from '@nestjs/common';
import { CommentsModule } from '@project/blog-comments';
import { BlogConfigModule } from '@project/config';

@Module({
  imports: [BlogConfigModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
