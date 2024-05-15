import { SortBy, SortDirection } from '../interfaces';

export const DEFAULT_PAGE_COUNT = 1;

export const DefaultPost = {
  MAX_COUNT_LIMIT: 100,
  COUNT_LIMIT: 10,
};

export const DefaultSort = {
  DIRECTION: SortDirection.Desc,
  BY: SortBy.createdAt,
};
