import { QuotePostContent, StorableEntity } from '@project/shared/core';
import { BasePostContentEntity } from './base-post-content.entity';

export class QuotePostContentEntity
  extends BasePostContentEntity
  implements StorableEntity<QuotePostContent>
{
  public author!: string;
  public quote!: string;

  constructor(data?: QuotePostContent) {
    super(data);
    this.populate(data);
  }

  public populate(data?: QuotePostContent) {
    if (!data) return;

    this.author = data.author;
    this.quote = data.quote;
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      author: this.author,
      quote: this.quote,
    };
  }
}
