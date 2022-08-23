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
import { EnumTablesModule } from './enum_tables/enum_tables.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
