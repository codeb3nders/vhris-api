import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}
  async sendEmail(data: any, tempPassword: string) {
    const { personalEmail } = data;
    const message = `Hi ${data.firstName} ${data.lastName},
    Here is your Account Credentials.
    Username: ${data.employeeNo}
    Password: ${tempPassword}

    It is highly recommended that you change your password immediately.

    Thank you.
    `;

    try {
      return await this.mailService.sendMail({
        to: personalEmail,
        from: `${process.env.EMAIL_DOMAIN}`,
        subject: 'VHRIS Account Access.',
        text: message,
      });
    } catch (error) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }
  }
}
