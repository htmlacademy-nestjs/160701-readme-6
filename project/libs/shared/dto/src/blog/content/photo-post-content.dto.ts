import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PhotoPostContentDto {
  @ApiProperty({
    description: 'Photo image ID',
    example: '65b809b8d6443b043b33eedb',
  })
  @IsString()
  imageId!: string;
}
