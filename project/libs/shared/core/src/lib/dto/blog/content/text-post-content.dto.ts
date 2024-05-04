import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { PostContentValidator } from '@project/validation';

export class TextPostContentDto {
  @ApiProperty({
    description: 'Text title',
    example: 'Lorem title',
  })
  @IsString()
  @MinLength(PostContentValidator.text.title.Min)
  @MaxLength(PostContentValidator.text.title.Max)
  title!: string;

  @ApiProperty({
    description: 'Text annotation',
    example: 'Lorem ipsum',
  })
  @IsString()
  @MinLength(PostContentValidator.text.annotation.Min)
  @MaxLength(PostContentValidator.text.annotation.Max)
  annotation!: string;

  @ApiProperty({
    description: 'Content annotation',
    example: 'Lorem ipsum',
  })
  @IsString()
  @MinLength(PostContentValidator.text.content.Min)
  @MaxLength(PostContentValidator.text.content.Max)
  content!: string;
}
