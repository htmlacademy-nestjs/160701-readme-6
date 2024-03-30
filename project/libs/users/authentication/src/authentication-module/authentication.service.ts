import { ConflictException, Injectable } from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUser, UserRole } from '@project/shared/core';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, firstname, password, avatarId } = dto;

    const blogUser: AuthUser = {
      email,
      firstname,
      role: UserRole.User,
      avatar: avatarId,
      createdAt: new Date(),
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = new BlogUserEntity(blogUser).setPasswordHash(password);

    return this.blogUserRepository.save(userEntity);
  }
}
