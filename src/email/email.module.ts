import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailService, ConfigService],
  exports: [EmailService],
})
export class EmailModule {}
