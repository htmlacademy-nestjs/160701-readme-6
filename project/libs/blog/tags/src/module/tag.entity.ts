import { Entity, Tag, StorableEntity } from '@project/shared/core';

export class BlogTagEntity extends Entity implements StorableEntity<Tag> {
  public name!: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(tag?: Tag) {
    super();
    this.populate(tag);
  }

  public populate(tag?: Tag) {
    if (!tag) {
      return;
    }

    this.id = tag.id;
    this.name = tag.name;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }

  toPOJO(): Tag {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
