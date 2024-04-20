import {
  AuthUser,
  Entity,
  StorableEntity,
  UserRole,
} from '@project/shared/core';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email!: string;
  public firstname!: string;
  public role!: UserRole;
  public avatar?: string | null;
  public passwordHash!: string;
  public createdAt?: Date;
  public publicationsCount?: number;
  public subscribersCount?: number;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser) {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstname = user.firstname;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.createdAt = user.createdAt ?? new Date();
    this.publicationsCount = user.publicationsCount;
    this.subscribersCount = user.subscribersCount;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      avatar: this.avatar,
      createdAt: this.createdAt,
      role: this.role,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
      passwordHash: this.passwordHash,
    };
  }

  public setPasswordHash(passwordHash: string) {
    this.passwordHash = passwordHash;

    return this;
  }
}
