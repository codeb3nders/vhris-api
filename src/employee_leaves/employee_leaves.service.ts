import { Injectable } from '@nestjs/common';
import { EmployeeLeavesRepository } from 'src/_repositories/employee_leaves/employee_leaves.repository';
import { CreateEmployeeLeaveDto } from './dto/create-employee_leave.dto';
import { UpdateEmployeeLeaveDto } from './dto/update-employee_leave.dto';

@Injectable()
export class EmployeeLeavesService {
  constructor(private employeeLeavesRepository: EmployeeLeavesRepository) {}

  async create(createEmployeeLeaveDto: CreateEmployeeLeaveDto) {
    return await this.employeeLeavesRepository.create(createEmployeeLeaveDto);
  }

  async findAll() {
    return await this.employeeLeavesRepository.find();
  }

  async findOne(employeeNo: string) {
    return await this.employeeLeavesRepository.findOne({ employeeNo });
  }

  async update(
    employeeNo: string,
    updateEmployeeLeaveDto: UpdateEmployeeLeaveDto,
  ) {
    return await this.employeeLeavesRepository.findOneAndUpdate(
      { employeeNo },
      { $set: { ...updateEmployeeLeaveDto } },
    );
  }

  async remove(employeeNo: string) {
    return await this.employeeLeavesRepository.deleteOne(employeeNo);
  }
}
