import { Prisma } from '@prisma/client';

export interface CommentFilter {
  id?: string;
  postId?: string;
}

export function commentFilterToPrismaFilter(
  filter: CommentFilter
): Prisma.CommentWhereInput | undefined {
  if (!filter) {
    return;
  }

  let prismaFilter: Prisma.CommentWhereInput = {};

  if (filter.postId) {
    prismaFilter = { postId: filter.postId };
  }

  return prismaFilter;
}
