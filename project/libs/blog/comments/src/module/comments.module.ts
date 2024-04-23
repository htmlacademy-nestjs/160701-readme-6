import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comment.repository';
import { PrismaClientModule } from '@project/blog-models';
import { CommentFactory } from './comment.factory';
import { CommentsTechController } from './comments-tech.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentsController, CommentsTechController],
  providers: [CommentsService, CommentRepository, CommentFactory],
  exports: [CommentsService],
})
export class CommentsModule {}
