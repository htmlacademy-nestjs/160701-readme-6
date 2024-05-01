import { Module } from '@nestjs/common';
import { PostContentService } from './post-content.service';
import { AllContentRepository } from '../repositories/content';
import { PostContentEntityFactory } from './post-content-entity.factory';
import { PostContentRepositoryFactory } from './post-content-repository.factory';
import { PrismaClientModule } from '@project/blog-models';

@Module({
  imports: [PrismaClientModule],
  providers: [
    PostContentService,
    PostContentEntityFactory,
    PostContentRepositoryFactory,
    ...AllContentRepository,
  ],
  exports: [PostContentService],
})
export class PostsContentModule {}
