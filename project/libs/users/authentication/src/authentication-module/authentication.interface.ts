import { BlogUserEntity } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

export interface AuthService {
  register(dto: CreateUserDto): Promise<BlogUserEntity>;
  verifyUser(dto: LoginUserDto): Promise<BlogUserEntity>;
  getUserById(id: string): Promise<BlogUserEntity>;
  getUserByEmail(email: string): Promise<BlogUserEntity>;
}
