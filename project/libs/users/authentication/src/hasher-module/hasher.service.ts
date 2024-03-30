import { Inject, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { Hasher } from './hasher.interface';

@Injectable()
export class HasherService implements Hasher {
  constructor(
    @Inject('SaltRounds')
    private readonly saltRounds: number
  ) {}

  public async generatePasswordHash(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);

    return hash(password, salt);
  }
  public async comparePassword({
    password,
    passwordHash,
  }: {
    password: string;
    passwordHash: string;
  }) {
    return compare(password, passwordHash);
  }
}
