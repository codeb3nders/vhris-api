import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from 'src/employees/employees.module';
import { AggregateLeaveBalance } from 'src/_aggregates/leave_balance.aggregate';
import { LeaveBalanceRepository } from 'src/_repositories/leave_balance/leave_balance.repository';
import { LeaveBalanceResponseHandler } from 'src/_utils/response_handler/leave_balance_handler.response';

import {
  LeaveBalance,
  LeaveBalanceSchema,
} from './entities/leave_balance.entity';
import { LeaveBalanceController } from './leave_balances.controller';
import { LeaveBalanceService } from './leave_balances.service';

@Module({
  imports: [
    EmployeesModule,
    MongooseModule.forFeature([
      {
        name: LeaveBalance.name,
        schema: LeaveBalanceSchema,
      },
    ]),
  ],
  controllers: [LeaveBalanceController],
  providers: [
    LeaveBalanceService,
    LeaveBalanceRepository,
    AggregateLeaveBalance,
    LeaveBalanceResponseHandler,
  ],
})
export class LeaveBalanceModule {}
