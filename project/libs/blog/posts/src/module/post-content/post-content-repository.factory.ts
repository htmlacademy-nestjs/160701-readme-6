import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  LinkPostRepository,
  PhotoPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
} from '../repositories/content';
import { PostContentEntityFactory } from './post-content-entity.factory';
import { PrismaClientService } from '@project/blog-models';
import { Repository } from '@project/data-access';
import { BasePostContentEntity } from '../entitites/content';
import { PostType } from '@project/shared/core';

interface PostContentRepository {
  create(type: PostType): Repository<BasePostContentEntity>;
}

@Injectable()
export class PostContentRepositoryFactory implements PostContentRepository {
  constructor(
    readonly entityFactory: PostContentEntityFactory,
    readonly client: PrismaClientService
  ) {}

  public create(type: PostType) {
    switch (type) {
      case PostType.VIDEO:
        return new VideoPostRepository(this.entityFactory, this.client);
      case PostType.TEXT:
        return new TextPostRepository(this.entityFactory, this.client);
      case PostType.LINK:
        return new LinkPostRepository(this.entityFactory, this.client);
      case PostType.PHOTO:
        return new PhotoPostRepository(this.entityFactory, this.client);
      case PostType.QUOTE:
        return new QuotePostRepository(this.entityFactory, this.client);
      default:
        throw new NotImplementedException(
          'Not implements post repository type'
        );
    }
  }
}
