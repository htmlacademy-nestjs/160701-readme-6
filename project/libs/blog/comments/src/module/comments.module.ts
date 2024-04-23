import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comment.repository';
import { PrismaClientModule } from '@project/blog-models';
import { CommentFactory } from './comment.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, CommentFactory],
  exports: [CommentsService],
})
export class CommentsModule {}
