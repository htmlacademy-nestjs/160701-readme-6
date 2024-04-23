import { Module } from '@nestjs/common';
import { CommentsModule } from '@project/blog-comments';
import { LikesModule } from '@project/blog-likes';
import { BlogConfigModule } from '@project/config';

@Module({
  imports: [BlogConfigModule, CommentsModule, LikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
