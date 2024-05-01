import { Injectable } from '@nestjs/common';
import { PostContentEntityFactory } from '../../post-content/post-content-entity.factory';
import { PrismaClientService } from '@project/blog-models';
import { TextPostContentEntity, UnionAllContentEntity } from '../../entitites/content';
import { TextPostContent } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class TextPostRepository extends BasePostgresRepository<
  UnionAllContentEntity,
  TextPostContent
> {
  constructor(
    entityFactory: PostContentEntityFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }
}
