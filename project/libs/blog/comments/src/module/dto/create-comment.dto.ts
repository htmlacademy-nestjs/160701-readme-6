import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/shared/core';
import {
  IsString,
  MinLength,
  MaxLength,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';
import { CommentValidator } from '@project/validation';
import { BlogCommentValidateMessage } from '../comment.constant';

export class CreateCommentDto
  implements Omit<Comment, 'createdAt' | 'updatedAt' | 'postId'>
{
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum',
  })
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  @MinLength(CommentValidator.message.Min)
  @MaxLength(CommentValidator.message.Max)
  public message!: string;

  @ApiProperty({
    description: 'User id',
    example: '65b7a93fe29bcc5e9410a607',
  })
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId!: string;
}
