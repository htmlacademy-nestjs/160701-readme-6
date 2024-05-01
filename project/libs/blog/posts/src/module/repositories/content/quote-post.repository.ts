import { Injectable } from '@nestjs/common';
import { PostContentEntityFactory } from '../../post-content/post-content-entity.factory';
import { PrismaClientService } from '@project/blog-models';
import {
  QuotePostContentEntity,
  UnionAllContentEntity,
} from '../../entitites/content';
import { QuotePostContent } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class QuotePostRepository extends BasePostgresRepository<
  UnionAllContentEntity,
  QuotePostContent
> {
  constructor(
    entityFactory: PostContentEntityFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }
}
