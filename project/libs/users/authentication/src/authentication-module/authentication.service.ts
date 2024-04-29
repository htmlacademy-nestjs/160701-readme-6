import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  AuthUser,
  Token,
  TokenPayload,
  User,
  UserRole,
} from '@project/shared/core';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG,
} from './authentication.constant';

import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from './authentication.interface';
import { Hasher } from '../hasher-module/hasher.interface';
import { HasherComponent } from '../hasher-module/hasher.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService implements AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
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
      passwordHash,
    };

    const userEntity = new BlogUserEntity(blogUser);
    const newEntity = await this.blogUserRepository.save(userEntity);

    return newEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG);
    }

    const isEqualPassword = await this.hasherService.comparePassword({
      password,
      passwordHash: existUser.passwordHash,
    });

    if (!isEqualPassword) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existUser;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: String(user.id),
      email: user.email,
      role: user.role,
      firstname: user.firstname,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error: any) {
      throw new HttpException(
        `Ошибка при создании токена: ${error?.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
