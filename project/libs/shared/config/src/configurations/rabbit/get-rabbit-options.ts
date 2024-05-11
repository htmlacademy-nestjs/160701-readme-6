import { ConfigService } from '@nestjs/config';
import { RabbitExchange } from '@project/shared/core';
import { getRabbitMQConnectionString } from '@project/shared/helpers';

export function getRabbitMQOptions(optionSpace = 'rabbit') {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: RabbitExchange.Income,
          type: 'direct',
        },
        {
          name: RabbitExchange.ChangePassword,
          type: 'direct',
        },
        {
          name: RabbitExchange.SendNewPosts,
          type: 'direct',
        },
        {
          name: RabbitExchange.RecoveryEmail,
          type: 'direct',
        },
      ],
      uri: getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        password: config.get<string>(`${optionSpace}.password`),
        user: config.get<string>(`${optionSpace}.user`),
        port: config.get<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService],
  };
}
