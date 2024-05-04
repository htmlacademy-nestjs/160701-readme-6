import { LinkPostContent, StorableEntity } from '@project/shared/core';
import { BasePostContentEntity } from './base-post-content.entity';

export class LinkPostContentEntity
  extends BasePostContentEntity
  implements StorableEntity<LinkPostContent>
{
  public url!: string;
  public description!: string;

  constructor(data?: LinkPostContent) {
    super(data);
    this.populate(data);
  }

  public populate(data?: LinkPostContent) {
    if (!data) return;

    this.url = data.url;
    this.description = data.description;
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      url: this.url,
      description: this.description,
    };
  }
}
