import { VideoPostContent, StorableEntity } from '@project/shared/core';
import { BasePostContentEntity } from './base-post-content.entity';

export class VideoPostContentEntity
  extends BasePostContentEntity
  implements StorableEntity<VideoPostContent>
{
  public title!: string;
  public url!: string;

  constructor(data?: VideoPostContent) {
    super(data);
    this.populate(data);
  }

  public populate(data?: VideoPostContent) {
    if (!data) return;

    this.title = data.title;
    this.url = data.url;
    this.postId = data.postId;
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      title: this.title,
      url: this.url,
      postId: this.postId,
    };
  }
}
