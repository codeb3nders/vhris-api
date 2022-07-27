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
  constructor(
    @InjectModel(Employee_history.name)
    private employeeHistoryModel: Model<EmployeeHistoryDocument>,
  ) {}
  async create(createEmployeeHistoryDto: CreateEmployeeHistoryDto) {
    const createEmployeeHistory = new this.employeeHistoryModel(
      createEmployeeHistoryDto,
    );
    return await createEmployeeHistory.save();
  }

  findAll() {
    return this.employeeHistoryModel.find();
  }

  findOne(employeeNo: string) {
    return this.employeeHistoryModel.findOne({ employeeNo });
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
