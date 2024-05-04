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
  public create(
    content: PostContent,
    postType?: PostType
  ): UnionAllContentEntity {
    if (postType === PostType.Video) {
      return new VideoPostContentEntity(content as VideoPostContent);
    }

    if (postType === PostType.Text) {
      return new TextPostContentEntity(content as TextPostContent);
    }

    if (postType === PostType.Link) {
      return new LinkPostContentEntity(content as LinkPostContent);
    }

    if (postType === PostType.Photo) {
      return new PhotoPostContentEntity(content as PhotoPostContent);
    }

    if (postType === PostType.Quote) {
      return new QuotePostContentEntity(content as QuotePostContent);
    }

    throw new NotImplementedException('Not implements post type');
  }
}
