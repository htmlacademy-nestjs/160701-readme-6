import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';
import { PostFactory } from './post.factory';
import { PostsContentModule } from './post-content/post-content.module';
import { TagModule } from '@project/blog-tags';
import { ScheduleModule } from '@nestjs/schedule';
import { NotifyModule } from '@project/blog-notify';
@Module({
  imports: [
    PrismaClientModule,
    PostsContentModule,
    TagModule,
    ScheduleModule.forRoot(),
    NotifyModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}
