import { Tag } from '../tag.interface';
import { Comment } from '../comment.interface';
import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';
import { Like } from '../like.interface';

export interface Post {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: PostStatus;
  type: PostType;
  authorId: string;
  tags?: Tag[];
  comments: Comment[];
  likes: Like[];
}
