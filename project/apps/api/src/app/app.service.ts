import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiMicroservicesConfig } from '@project/config';

@Injectable()
export class AppService {
  public readonly Users!: string;
  public readonly Blog!: string;
  public readonly FileVault!: string;

  constructor(
    @Inject(ApiMicroservicesConfig.KEY)
    private readonly config: ConfigType<typeof ApiMicroservicesConfig>
  ) {
    const { usersHost, usersPort, usersPrefix } = this.config;
    const { blogHost, blogPort, blogPrefix } = this.config;
    const { fileVaultHost, fileVaultPort, fileVaultPrefix } = this.config;

    this.Users = this.getUrl(usersHost, usersPort, usersPrefix);
    this.Blog = this.getUrl(blogHost, blogPort, blogPrefix);
    this.FileVault = this.getUrl(fileVaultHost, fileVaultPort, fileVaultPrefix);
  }

  private getUrl(host: string, port: number, prefix: string) {
    return `${host}:${port}/${prefix}`;
  }
}
