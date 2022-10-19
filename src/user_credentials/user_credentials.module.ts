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
import { UserCredentialResponseHandler } from 'src/_utils/response_handler/user_credential_handler.response';
import { UserCode, UserCodeSchema } from './entities/user_code.entity';
import { UserCredentialRepository } from 'src/_repositories/user_credential/user_credential.repository';
import { EmployeeRepository } from 'src/employees/employee.repository';
import { UserCodeRepository } from 'src/_repositories/user_codes/user_codes.repository';

@Module({
  imports: [
    forwardRef(() => EmployeesModule),

    MongooseModule.forFeature([
      {
        name: UserCredential.name as 'user_cred',
        schema: UserCredentialSchema,
      },
      {
        name: UserCode.name,
        schema: UserCodeSchema,
      },
    ]),
  ],
  controllers: [UserCredentialsController],

  providers: [
    UserCredentialsService,
    EmailService,
    UserCredentialResponseHandler,
    UserCredentialRepository,
    UserCodeRepository,
  ],
  exports: [UserCredentialsService],
})
export class UserCredentialsModule {}
