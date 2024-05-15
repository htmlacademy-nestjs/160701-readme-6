import { BasePostContent } from './base-post-content.interface';

export interface QuotePostContent extends BasePostContent {
  quote: string;
  author: string;
}
