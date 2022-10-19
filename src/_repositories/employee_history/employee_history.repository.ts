import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EmployeeHistoryDocument,
  EmployeeHistory,
} from 'src/employee_history/entities/employee_history.entity';
import { AggregateEmployeeHistory } from 'src/_aggregates/employee_history.aggregate';
import { EntityRepository } from '../entity.repository';

@Injectable()
export class EmployeeHistoryRepository extends EntityRepository<EmployeeHistoryDocument> {
  constructor(
    @InjectModel(EmployeeHistory.name)
    EmployeeHistoryModel: Model<EmployeeHistoryDocument>,
    aggregateQry: AggregateEmployeeHistory,
  ) {
    super(EmployeeHistoryModel, aggregateQry);
  }
}
