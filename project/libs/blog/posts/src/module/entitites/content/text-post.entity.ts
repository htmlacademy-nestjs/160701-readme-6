import { TextPostContent, StorableEntity } from '@project/shared/core';
import { BasePostContentEntity } from './base-post-content.entity';

export class TextPostContentEntity
  extends BasePostContentEntity
  implements StorableEntity<TextPostContent>
{
  public annotation!: string;
  public title!: string;
  public content!: string;

  constructor(data?: TextPostContent) {
    super(data);
    this.populate(data);
  }

  public populate(data?: TextPostContent) {
    if (!data) return;
    this.annotation = data.annotation;
    this.title = data.title;
    this.content = data.content;
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      annotation: this.annotation,
      title: this.title,
      content: this.content,
    };
  }
}
