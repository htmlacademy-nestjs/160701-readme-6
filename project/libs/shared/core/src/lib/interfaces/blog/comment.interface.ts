export interface Comment {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  message: string;
  postId: string;
  userId: string;
}
