import { Module } from '@nestjs/common';
import { EmployeeHistoryService } from './employee_history.service';
import { EmployeeHistoryController } from './employee_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Employee_history,
  EmployeeHistorySchema,
} from './entities/employee_history.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee_history.name,
        schema: EmployeeHistorySchema,
      },
    ]),
  ],
  controllers: [EmployeeHistoryController],
  providers: [EmployeeHistoryService],
  exports: [EmployeeHistoryService],
})
export class EmployeeHistoryModule {}
