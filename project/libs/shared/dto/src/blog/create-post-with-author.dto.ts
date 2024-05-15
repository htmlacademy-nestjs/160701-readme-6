import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class CreatePostWithAuthorDto extends CreatePostDto {
  @ApiProperty({
    description: 'Author id',
    example: '65b809b8d6443b043b33eedb',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  public authorId!: string;
}
