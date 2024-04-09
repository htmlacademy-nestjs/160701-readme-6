import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public email!: string;

  @Expose()
  public firstname!: string;
}
