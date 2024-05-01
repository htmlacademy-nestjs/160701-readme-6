import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { BlogTagController } from './tag.controller';
import { BlogTagService } from './tag.service';
import { BlogTagRepository } from './tag.repository';
import { BlogTagFactory } from './tag.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogTagController],
  providers: [BlogTagService, BlogTagRepository, BlogTagFactory],
  exports: [BlogTagService],
})
export class BlogTagModule {}
