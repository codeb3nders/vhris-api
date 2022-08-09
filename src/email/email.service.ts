import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import configuration from 'config/configuration';

const { email } = configuration();

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendEmail(toemmail: string, textMessage: string) {
    return await this.mailService.sendMail({
      to: toemmail,
      from: `${email}`,
      subject: 'Test email sending',
      text: `Welcome to HRIS. your temporary password is  ${textMessage}`,
    });
  }
}
