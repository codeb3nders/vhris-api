import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { LeaveRequestModule } from './leave_requests/leave_request.module';
import { OvertimeRequestsModule } from './overtime_requests/overtime_requests.module';
import { LeaveTypesModule } from './leave_types/leave_types.module';
import { EmployeeLeavesModule } from './employee_leaves/employee_leaves.module';
import { EmployeeHistoryModule } from './employee_history/employee_history.module';
import { MailerModule } from '@nestjs-modules/mailer';

import { EmailModule } from './email/email.module';

import { UserCredentialsModule } from './user_credentials/user_credentials.module';
import { AuthModule } from './auth/auth.module';
import { EnumTablesModule } from './enums_table/enums_table.module';
import { ValidatorsService } from './validators/validators.service';
import { ValidatorsModule } from './validators/validators.module';
import { LearningDevelopmentModule } from './learning_development/learning_development.module';
import { AssetManagementModule } from './asset_management/asset_management.module';
import { EmployeeDocumentsModule } from './employee_documents/employee_documents.module';
import { DisciplinaryActionsModule } from './disciplinary_actions/disciplinary_actions.module';
import { TimeKeepingModule } from './time_keeping/time_keeping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env_var/.env',
    }),
    EmployeesModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    ),
    MailerModule.forRoot({
      transport: {
        host: `${process.env.EMAIL_HOST}`,
        auth: {
          user: `${process.env.EMAIL_USER}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      },
    }),
    LeaveRequestModule,
    OvertimeRequestsModule,
    LeaveTypesModule,
    EmployeeLeavesModule,
    EmployeeHistoryModule,
    EmailModule,
    UserCredentialsModule,
    AuthModule,
    EnumTablesModule,
    ValidatorsModule,
    LearningDevelopmentModule,
    AssetManagementModule,
    EmployeeDocumentsModule,
    DisciplinaryActionsModule,
    TimeKeepingModule,
  ],
  controllers: [AppController],
  providers: [AppService, ValidatorsService],
})
export class AppModule {}
