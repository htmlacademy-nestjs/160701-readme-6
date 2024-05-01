import { Injectable } from '@nestjs/common';
import { VideoPostContent } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';
import { VideoPostContentEntity } from '../../entitites/content';
import { PostContentEntityFactory } from '../../post-content/post-content-entity.factory';
import { PrismaClientService } from '@project/blog-models';

@Injectable()
export class VideoPostRepository extends BasePostgresRepository<
  VideoPostContentEntity,
  VideoPostContent
> {
  constructor(
    entityFactory: PostContentEntityFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }
}
