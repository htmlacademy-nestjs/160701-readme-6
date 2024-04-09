import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUser, UserRole } from '@project/shared/core';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentication.constant';

import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from './authentication.interface';
import { Hasher } from '../hasher-module/hasher.interface';
import { HasherComponent } from '../hasher-module/hasher.enum';

@Injectable()
export class AuthenticationService implements AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject(HasherComponent.Service)
    private readonly hasherService: Hasher
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, firstname, password, avatarId } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(`${AUTH_USER_EXISTS}: ${email}`);
    }

    const passwordHash = await this.hasherService.generatePasswordHash(
      password
    );

    const blogUser: AuthUser = {
      email,
      firstname,
      role: UserRole.User,
      avatar: avatarId,
      createdAt: new Date(),
      passwordHash,
    };

    const userEntity = new BlogUserEntity(blogUser);
    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const isEqualPassword = await this.hasherService.comparePassword({
      password,
      passwordHash: existUser.passwordHash,
    });

    if (!isEqualPassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }
}
