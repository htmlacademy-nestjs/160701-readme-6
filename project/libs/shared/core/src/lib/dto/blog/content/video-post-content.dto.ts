import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PostContentValidator } from '@project/validation';

export class VideoPostContentDto {
  @ApiProperty({
    description: 'Video title',
    example: 'Lorem ipsum dolor sit amet. Suscipit, est?',
  })
  @IsString()
  @MinLength(PostContentValidator.video.title.Min)
  @MaxLength(PostContentValidator.video.title.Max)
  title!: string;

  @ApiProperty({
    description: 'Valid url link',
    example: 'https://www.youtube.com/watch?v=JU79n3yU1aA',
  })
  @Matches(PostContentValidator.video.url.Matches)
  url!: string;
}
