import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { EmailService } from 'src/email/email.service';

import { UserCredentialsModule } from 'src/user_credentials/user_credentials.module';
import { ValidatorsModule } from 'src/_validators/validators.module';
import { ValidatorsService } from 'src/_validators/validators.service';
import { EmployeeHistoryModule } from 'src/employee_history/employee_history.module';
import { EmployeesResponseHandler } from 'src/_utils/response_handler/employees_handler.response';
import { EmployeeRepository } from 'src/employees/employee.repository';
import { AggregateEmployee } from 'src/_aggregates/employee.aggregate';

@Module({
  imports: [
    UserCredentialsModule,
    ValidatorsModule,
    EmployeeHistoryModule,
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    EmailService,
    ValidatorsService,
    EmployeesResponseHandler,
    EmployeeRepository,
    AggregateEmployee,
  ],
  exports: [EmployeesService, EmployeeRepository],
})
export class EmployeesModule {}
