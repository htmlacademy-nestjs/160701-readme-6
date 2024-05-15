import { BasePostContent } from './base-post-content.interface';

export interface VideoPostContent extends BasePostContent {
  title: string;

  url: string;
}
