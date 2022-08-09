import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createEmployeeLeaveDto } from './dto/create-employee_leave.dto';
import { UpdateEmployeeleaveDto } from './dto/update-employee_leave.dto';
import {
  EmployeeLeavesDocument,
  Employee_leaves,
} from './entities/employee_leave.entity';

@Injectable()
export class EmployeeLeavesService {
  constructor(
    @InjectModel(Employee_leaves.name)
    private employeeLeavesModel: Model<EmployeeLeavesDocument>,
  ) {}

  create(createEmployeeLeaveDto: createEmployeeLeaveDto) {
    const createdEmployeeLeave = new this.employeeLeavesModel(
      createEmployeeLeaveDto,
    );
    return createdEmployeeLeave.save();
  }

  findAll() {
    return this.employeeLeavesModel.find().exec();
  }

  findOne(employeeNo: string) {
    return this.employeeLeavesModel.findOne({ employeeNo });
  }

  update(employeeNo: string, updateEmployeeLeaveDto: UpdateEmployeeleaveDto) {
    return this.employeeLeavesModel.updateOne(
      { employeeNo },
      { $set: { ...updateEmployeeLeaveDto } },
    );
  }

  remove(employeeNo: string) {
    return `This action removes a #${employeeNo} employeeleave`;
  }
}
