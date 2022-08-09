import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}
  async sendEmail(toemmail: string, textMessage: string) {
    const email = this.configService.get('PORT');
    return await this.mailService.sendMail({
      to: toemmail,
      from: `${email}`,
      subject: 'Test email sending',
      text: `Welcome to HRIS. your temporary password is  ${textMessage}`,
    });
  }
}
