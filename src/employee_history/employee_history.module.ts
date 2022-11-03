import { Module } from '@nestjs/common';
import { EmployeeHistoryService } from './employee_history.service';
import { EmployeeHistoryController } from './employee_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmployeeHistory,
  EmployeeHistorySchema,
} from './entities/employee_history.entity';
import { EmployeeHistoryResponseHandler } from 'src/_utils/response_handler/employee_history_handler.response';
import { EmployeeHistoryRepository } from 'src/_repositories/employee_history/employee_history.repository';
import { AggregateEmployeeHistory } from 'src/_aggregates/employee_history.aggregate';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmployeeHistory.name,
        schema: EmployeeHistorySchema,
      },
    ]),
  ],
  controllers: [EmployeeHistoryController],
  providers: [
    EmployeeHistoryService,
    EmployeeHistoryResponseHandler,
    EmployeeHistoryRepository,
    AggregateEmployeeHistory,
  ],
  exports: [EmployeeHistoryService],
})
export class EmployeeHistoryModule {}
