import { Module } from '@nestjs/common';
import { EmployeeHistoryService } from './employee_history.service';
import { EmployeeHistoryController } from './employee_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmployeeHistory,
  EmployeeHistorySchema,
} from './entities/employee_history.entity';
import { EmployeeHistoryResponseHandler } from 'src/response_handler/employee_history_handler.response';

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
  providers: [EmployeeHistoryService, EmployeeHistoryResponseHandler],
  exports: [EmployeeHistoryService],
})
export class EmployeeHistoryModule {}
