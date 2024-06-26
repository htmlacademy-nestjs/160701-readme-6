import { Tag } from '../tag.interface';
import { Comment } from '../comment.interface';
import { Like } from '../like.interface';
import { VideoPostContent } from './content/video-post-content.interface';
import { PostStatus, PostType } from '../../../enums';

export interface Post {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: PostStatus;
  type: PostType;
  authorId: string;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];

  postVideo?: VideoPostContent;
}
