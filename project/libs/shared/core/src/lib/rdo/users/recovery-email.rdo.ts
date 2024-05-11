import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RecoveryEmailRdo {
  @Expose()
  @ApiProperty({
    description: 'Message',
    example: 'Recovery email sent successfully',
  })
  public message!: string;
}
