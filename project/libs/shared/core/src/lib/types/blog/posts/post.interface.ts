import { Tag } from '../tag.interface';
import { Comment } from '../comment.interface';
import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';
import { Like } from '@prisma/client';

export interface Post {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  status: PostStatus;
  type: PostType;
  title: string;
  authorId: string;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
}
