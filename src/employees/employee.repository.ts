import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EmployeeDocument,
  Employee,
} from 'src/employees/entities/employee.entity';
import { AggregateEmployee } from 'src/_aggregates/employee.aggregate';
import { EntityRepository } from '../_repositories/entity.repository';

@Injectable()
export class EmployeeRepository extends EntityRepository<EmployeeDocument> {
  constructor(
    @InjectModel(Employee.name)
    assetManagementModel: Model<EmployeeDocument>,
    aggregateQry: AggregateEmployee,
  ) {
    super(assetManagementModel, aggregateQry);
  }
}
