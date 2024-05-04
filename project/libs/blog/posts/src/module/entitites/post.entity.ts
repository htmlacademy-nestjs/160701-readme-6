import {
  Entity,
  Post,
  PostType,
  PostStatus,
  StorableEntity,
  PostContent,
  VideoPostContent,
} from '@project/shared/core';
import { CommentEntity, CommentFactory } from '@project/blog-comments';
import { LikeEntity, LikeFactory } from '@project/blog-likes';
import { TagEntity, TagFactory } from '@project/blog-tags';

export class PostEntity extends Entity implements StorableEntity<Post> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public status!: PostStatus;
  public type!: PostType;
  public authorId!: string;
  public comments!: CommentEntity[];
  public likes!: LikeEntity[];
  public tags?: TagEntity[];

  public PostVideo?: VideoPostContent;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;

    this.authorId = post.authorId;
    this.status = post.status;
    this.type = post.type;

    this.PostVideo = post.PostVideo;

    const commentFactory = new CommentFactory();
    this.comments = post.comments?.map(commentFactory.create);

    const likeFactory = new LikeFactory();
    this.likes = post.likes?.map(likeFactory.create);

    const tagFactory = new TagFactory();
    this.tags = post.tags?.map(tagFactory.create);
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      authorId: this.authorId,
      status: this.status,
      type: this.type,
      tags: this.tags?.map((tagEntity) => tagEntity.toPOJO()),
      comments: this.comments?.map((commentEntity) => commentEntity.toPOJO()),
      likes: this.likes?.map((likeEntity) => likeEntity.toPOJO()),

      PostVideo: this.PostVideo,
    };
  }
}
