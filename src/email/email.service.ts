import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendEmail(toemmail: string, textMessage: string) {
    return await this.mailService.sendMail({
      to: toemmail,
      from: 'codeb3nder@gmail.com',
      subject: 'Test email sending',
      text: `Welcome to HRIS ${textMessage}`,
    });
  }
}
