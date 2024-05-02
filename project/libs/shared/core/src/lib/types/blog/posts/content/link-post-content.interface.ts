import { BasePostContent } from './base-post-content.interface';

export interface LinkPostContent extends BasePostContent {
  url: string;
  description: string;
}
