import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';

import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from '@project/dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
  }

  public async deleteSubscriber(email: string) {
    await this.emailSubscriberRepository.deleteByEmail(email);
  }

  public async getAllSubscribers(): Promise<EmailSubscriberEntity[]> {
    return await this.emailSubscriberRepository.findAll();
  }
}
