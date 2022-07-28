import { Module } from '@nestjs/common';
import { UserCredentialsService } from './user_credentials.service';
import { UserCredentialsController } from './user_credentials.controller';

@Module({
  controllers: [UserCredentialsController],
  providers: [UserCredentialsService],
  exports: [UserCredentialsService],
})
export class UserCredentialsModule {}
