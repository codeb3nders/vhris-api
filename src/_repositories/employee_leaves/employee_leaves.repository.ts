import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EmployeeLeavesDocument,
  EmployeeLeaves,
} from 'src/employee_leaves/entities/employee_leave.entity';
import { EntityRepository } from '../entity.repository';

@Injectable()
export class EmployeeLeavesRepository extends EntityRepository<EmployeeLeavesDocument> {
  constructor(
    @InjectModel(EmployeeLeaves.name)
    EmployeeLeavesModel: Model<EmployeeLeavesDocument>,
  ) {
    super(EmployeeLeavesModel);
  }
}
