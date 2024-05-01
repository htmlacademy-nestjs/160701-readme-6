import { Injectable } from '@nestjs/common';
import { PostContentEntityFactory } from '../../post-content/post-content-entity.factory';
import { PrismaClientService } from '@project/blog-models';
import { PhotoPostContentEntity } from '../../entitites/content';
import { PhotoPostContent } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class PhotoPostRepository extends BasePostgresRepository<
  PhotoPostContentEntity,
  PhotoPostContent
> {
  constructor(
    entityFactory: PostContentEntityFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }
}
