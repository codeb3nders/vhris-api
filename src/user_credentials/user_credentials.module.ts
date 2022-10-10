import { forwardRef, Module } from '@nestjs/common';

import { UserCredentialsService } from './user_credentials.service';
import { UserCredentialsController } from './user_credentials.controller';
import {
  UserCredentialSchema,
  UserCredential,
} from './entities/user_credential.entity';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailService } from 'src/email/email.service';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    forwardRef(() => EmployeesModule),

    MongooseModule.forFeature([
      {
        name: UserCredential.name,
        schema: UserCredentialSchema,
      },
    ]),
  ],
  controllers: [UserCredentialsController],

  providers: [UserCredentialsService, EmailService],
  exports: [UserCredentialsService, UserCredentialsService],
})
export class UserCredentialsModule {}
