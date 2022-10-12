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
  async sendEmail(data: any, tempPassword: string, message?: any) {
    const { personalEmail } = data;
    const emailMessage = message
      ? message
      : `
    Hi ${data.firstName} ${data.lastName},

    Here is your Account Credentials.
    Username: ${data.employeeNo}
    Password: ${tempPassword}

    It is highly recommended that you change your password immediately.

    Thank you.
    `;

    const emailDetails = {
      to: personalEmail,
      from: `${process.env.EMAIL_DOMAIN}`,
      subject: 'VHRIS Account Access.',
      text: emailMessage,
    };

    try {
      return await this.mailService.sendMail(emailDetails);
    } catch (error) {
      return error.message || error;
    }
  }

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
