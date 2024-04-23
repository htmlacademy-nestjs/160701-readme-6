import { Injectable } from '@nestjs/common';

import { Like, EntityFactory } from '@project/shared/core';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeFactory implements EntityFactory<LikeEntity> {
  public create(entityPlainData: Like): LikeEntity {
    return new LikeEntity(entityPlainData);
  }
}
