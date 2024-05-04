import { PhotoPostContent, StorableEntity } from '@project/shared/core';
import { BasePostContentEntity } from './base-post-content.entity';

export class PhotoPostContentEntity
  extends BasePostContentEntity
  implements StorableEntity<PhotoPostContent>
{
  public imageId!: string;

  constructor(data?: PhotoPostContent) {
    super(data);
    this.populate(data);
  }

  public populate(data?: PhotoPostContent) {
    if (!data) return;

    this.imageId = data.imageId;
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      imageId: this.imageId,
    };
  }
}
