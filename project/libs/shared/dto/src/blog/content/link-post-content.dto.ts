import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsUrl } from 'class-validator';
import { PostContentValidator } from '@project/validation';

export class LinkPostContentDto {
  @ApiProperty({
    description: 'Valid url link',
    example: 'https://link.com/acaca',
  })
  @IsUrl()
  @IsString()
  url!: string;

  @ApiProperty({
    description: 'Text',
    example: 'Lorem ipsum',
  })
  @IsString()
  @MinLength(PostContentValidator.link.description.Min)
  @MaxLength(PostContentValidator.link.description.Max)
  description!: string;
}
