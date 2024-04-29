import { Module } from '@nestjs/common';
import { CommentsModule } from '@project/blog-comments';
import { LikesModule } from '@project/blog-likes';
import { PostModule } from '@project/blog-post';
import { BlogConfigModule } from '@project/config';

@Module({
  imports: [BlogConfigModule, PostModule, CommentsModule, LikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
