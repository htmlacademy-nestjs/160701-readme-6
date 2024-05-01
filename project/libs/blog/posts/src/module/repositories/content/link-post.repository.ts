import { Injectable } from '@nestjs/common';
import { PostContentEntityFactory } from '../../post-content/post-content-entity.factory';
import { PrismaClientService } from '@project/blog-models';
import {
  LinkPostContentEntity,
  UnionAllContentEntity,
} from '../../entitites/content';
import { LinkPostContent } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class LinkPostRepository extends BasePostgresRepository<
  UnionAllContentEntity,
  LinkPostContent
> {
  constructor(
    entityFactory: PostContentEntityFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }
}
