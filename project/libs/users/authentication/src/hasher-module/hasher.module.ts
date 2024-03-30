import { Module } from '@nestjs/common';
import { HasherService } from './hasher.service';
import { SALT_ROUNDS } from './hasher.const';

@Module({
  providers: [
    HasherService,
    {
      provide: 'SaltRounds',
      useValue: SALT_ROUNDS,
    },
  ],
  exports: [HasherService],
})
export class HasherModule {}
