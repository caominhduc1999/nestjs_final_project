import PQueue from 'p-queue';
import pRetry from 'p-retry';
import twilio from 'twilio';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import TwilioClient from 'twilio/lib/rest/Twilio';
import { Twilio } from 'twilio';


@Injectable()
export class TwilioService {
  client: TwilioClient;

  logger = new Logger(TwilioService.name);

  constructor(private configService: ConfigService) {
    const twilioAccountSid = configService.get<string>(
      process.env.TWILIO_ACCOUNT_SID,
    );
    const twilioAuthToken = configService.get<string>(
        process.env.TWILIO_AUTH_TOKEN,
    );

    this.client = new Twilio(
      twilioAccountSid,
      twilioAuthToken,
    );
  }

  private async sendSms(options: MessageListInstanceCreateOptions) {
    return this.client.messages.create(options);
  }

  send(options: MessageListInstanceCreateOptions) {
    return this.sendSms(options)
      .then(() => {
        this.logger.debug(`SMS to ${options.to} sent successfully`);
      })
      .catch((error) => {
        this.logger.error(`Failed to send SMS to ${options.to}`, error);
        throw error;
      });
  }
}