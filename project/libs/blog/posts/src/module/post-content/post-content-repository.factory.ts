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
      case PostType.Video:
        return new VideoPostRepository(this.entityFactory, this.client);
      case PostType.Text:
        return new TextPostRepository(this.entityFactory, this.client);
      case PostType.Link:
        return new LinkPostRepository(this.entityFactory, this.client);
      case PostType.Photo:
        return new PhotoPostRepository(this.entityFactory, this.client);
      case PostType.Quote:
        return new QuotePostRepository(this.entityFactory, this.client);
      default:
        throw new NotImplementedException(
          'Not implements post repository type'
        );
    }
  }
}
