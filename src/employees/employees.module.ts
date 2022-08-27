import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { EmailService } from 'src/email/email.service';

import { UserCredentialsModule } from 'src/user_credentials/user_credentials.module';
import { ValidatorsModule } from 'src/validators/validators.module';
import { ValidatorsService } from 'src/validators/validators.service';

@Module({
  imports: [
    UserCredentialsModule,
    ValidatorsModule,
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmailService, ValidatorsService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
