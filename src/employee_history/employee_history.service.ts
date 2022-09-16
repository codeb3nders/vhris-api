import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeHistoryDto } from './dto/create-employee_history.dto';
import { UpdateEmployeeHistoryDto } from './dto/update-employee_history.dto';
import {
  Employee_history,
  EmployeeHistoryDocument,
} from './entities/employee_history.entity';

@Injectable()
export class EmployeeHistoryService {
  private aggregateQry;
  constructor(
    @InjectModel(Employee_history.name)
    private employeeHistoryModel: Model<EmployeeHistoryDocument>,
  ) {
    this.aggregateQry = [
      {
        $lookup: lookUp(
          'enum_tables',
          'details.paymentMethod',
          'code',
          'paymentMethodEnum',
        ),
      },
      {
        $lookup: lookUp(
          'enum_tables',
          'details.employmentType',
          'code',
          'employmentTypeEnum',
        ),
      },
      {
        $lookup: lookUp('enum_tables', 'details.gender', 'code', 'genderEnum'),
      },
    ];
  }
  async create(createEmployeeHistoryDto: CreateEmployeeHistoryDto) {
    const createEmployeeHistory = new this.employeeHistoryModel(
      createEmployeeHistoryDto,
    );
    return await createEmployeeHistory.save();
  }

  async findAll() {
    return await this.employeeHistoryModel.find();
  }

  async find(employeeNo?: string) {
    const pipeline = [...this.aggregateQry];
    const response = await this.employeeHistoryModel.aggregate(pipeline);
    return response;
  }

  update(
    employeeNo: string,
    updateEmployeeHistoryDto: UpdateEmployeeHistoryDto,
  ) {
    return this.employeeHistoryModel.updateOne(
      { employeeNo },
      { $set: { ...updateEmployeeHistoryDto } },
    );
  }

  remove(employeeNo: string) {
    return this.employeeHistoryModel.deleteOne({ employeeNo });
  }
}

const lookUp = (
  tableName: string,
  localField: string,
  foreignField: string,
  asName: string,
) => {
  return {
    from: `${tableName}`,
    let: { field: { $toUpper: `$${localField}` } },
    pipeline: [
      { $addFields: { code: { $toUpper: `$${foreignField}` } } },
      { $match: { $expr: { $eq: [`$${foreignField}`, '$$field'] } } },
    ],
    as: asName,
  };
};
