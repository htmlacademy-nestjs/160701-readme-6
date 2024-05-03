import { BasePostContent, Entity, StorableEntity } from '@project/shared/core';

export class BasePostContentEntity
  extends Entity
  implements StorableEntity<BasePostContent>
{
  public createdAt?: Date;
  public postId!: string;

  constructor(post?: BasePostContent) {
    super();
    this.populate(post);
  }

  public populate(data?: BasePostContent) {
    if (!data) {
      return;
    }

    this.id = data.id;
    this.createdAt = data.createdAt;
    this.postId = data.postId;
  }

  public toPOJO() {
    return {
      ...this,
      id: this.id,
    };
  }
}
