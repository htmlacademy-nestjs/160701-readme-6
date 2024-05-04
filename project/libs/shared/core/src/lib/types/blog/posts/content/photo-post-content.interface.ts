import { BasePostContent } from './base-post-content.interface';

export interface PhotoPostContent extends BasePostContent {
  imageId: string;
}
