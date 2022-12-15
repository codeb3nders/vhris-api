import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LeaveBalanceDocument,
  LeaveBalance,
} from 'src/leave_balances/entities/leave_balance.entity';
import { AggregateLeaveBalance } from 'src/_aggregates/leave_balance.aggregate';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class LeaveBalanceRepository extends EntityRepository<LeaveBalanceDocument> {
  constructor(
    @InjectModel(LeaveBalance.name)
    leaveBalanceModel: Model<LeaveBalanceDocument>,
    aggregateQry: AggregateLeaveBalance,
  ) {
    super(leaveBalanceModel, aggregateQry);
  }
}
