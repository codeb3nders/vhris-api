import { Module } from '@nestjs/common';
import { LeaveBalancesService } from './leave_balances.service';
import { LeaveBalancesController } from './leave_balances.controller';

@Module({
  controllers: [LeaveBalancesController],
  providers: [LeaveBalancesService]
})
export class LeaveBalancesModule {}
