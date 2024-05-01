import {
  EntityFactory,
  LinkPostContent,
  PhotoPostContent,
  PostContent,
  PostType,
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
  public create(content: PostContent, postType?: PostType) {
    if (postType === PostType.VIDEO) {
      return new VideoPostContentEntity(content as VideoPostContent);
    }

    if (postType === PostType.TEXT) {
      return new TextPostContentEntity(content as TextPostContent);
    }

    if (postType === PostType.LINK) {
      return new LinkPostContentEntity(content as LinkPostContent);
    }

    if (postType === PostType.PHOTO) {
      return new PhotoPostContentEntity(content as PhotoPostContent);
    }

    if (postType === PostType.QUOTE) {
      return new QuotePostContentEntity(content as QuotePostContent);
    }

    throw new NotImplementedException('Not implements post type');
  }
}
