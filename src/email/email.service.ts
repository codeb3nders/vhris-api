import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface IEmailInfo {
  to: string;
  subject: string;
  text?: string;
  html?: any;
}

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendMail({ to, subject, text, html }: IEmailInfo) {
    const from = `${process.env.EMAIL_DOMAIN}`;
    const emailDetails = {
      to,
      from,
      subject,
      text,
      html,
    };

    return await this.mailService.sendMail(emailDetails);
  }
}
