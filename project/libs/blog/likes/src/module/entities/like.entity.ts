import { Entity, Like, StorableEntity } from '@project/shared/core';

export class LikeEntity extends Entity implements StorableEntity<Like> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId!: string;
  public postId!: string;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public populate(like?: Like) {
    if (!like) return;

    this.id = like.id;
    this.createdAt = like.createdAt;
    this.userId = like.userId;
    this.postId = like.postId;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      postId: this.postId,
    };
  }
}
