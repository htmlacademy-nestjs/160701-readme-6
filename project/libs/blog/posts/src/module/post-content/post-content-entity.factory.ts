import {
  EntityFactory,
  LinkPostContent,
  PhotoPostContent,
  PostContent,
  QuotePostContent,
  TextPostContent,
  VideoPostContent,
} from '@project/shared/core';
import {
  UnionAllContentEntity,
  LinkPostContentEntity,
  PhotoPostContentEntity,
  QuotePostContentEntity,
  TextPostContentEntity,
  VideoPostContentEntity,
} from '../entitites/content';
import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class PostContentEntityFactory
  implements EntityFactory<UnionAllContentEntity>
{
  public create(content: PostContent) {
    if (content instanceof VideoPostContent) {
      return new VideoPostContentEntity(content);
    }

    if (content instanceof TextPostContent) {
      return new TextPostContentEntity(content);
    }

    if (content instanceof LinkPostContent) {
      return new LinkPostContentEntity(content);
    }

    if (content instanceof PhotoPostContent) {
      return new PhotoPostContentEntity(content);
    }

    if (content instanceof QuotePostContent) {
      return new QuotePostContentEntity(content);
    }

    throw new NotImplementedException('Not implements post type');
  }
}
