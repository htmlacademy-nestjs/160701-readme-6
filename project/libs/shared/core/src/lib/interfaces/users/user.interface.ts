import { UserRole } from '../../enums/users/user-role.enum';

export interface User {
  id?: string;
  email: string;
  firstname: string;
  avatar?: string | null;
  role: UserRole;
  createdAt?: Date;
  publicationsCount?: number;
  subscribersCount?: number;
}
