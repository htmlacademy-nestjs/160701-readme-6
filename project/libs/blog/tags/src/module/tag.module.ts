import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { BlogTagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';
import { TagFactory } from './tag.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogTagController],
  providers: [TagService, TagRepository, TagFactory],
  exports: [TagService],
})
export class TagModule {}
