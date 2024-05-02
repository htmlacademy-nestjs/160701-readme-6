import { BasePostContent } from './base-post-content.interface';
export interface TextPostContent extends BasePostContent {
  title: string;

  annotation: string;

  content: string;
}
