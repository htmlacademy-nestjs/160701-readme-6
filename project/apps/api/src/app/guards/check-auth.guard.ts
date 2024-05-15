import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppService } from '../app.service';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly appServiceUrl: AppService
  ) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(
      `${this.appServiceUrl.Users}/check`,
      {},
      {
        headers: {
          Authorization: request.headers['authorization'],
        },
      }
    );

    request['user'] = data;

    return true;
  }
}
