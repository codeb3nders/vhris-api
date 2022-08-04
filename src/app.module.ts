import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'config/configuration';
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


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: 'env_var/.env',
      load: [configuration],
    }),
    EmployeesModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    ),
    LeaveRequestModule,
    OvertimeRequestsModule,
    LeaveTypesModule,
    EmployeeLeavesModule,
    EmployeeHistoryModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
