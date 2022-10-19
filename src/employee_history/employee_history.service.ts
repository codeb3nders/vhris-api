import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { withEnumValuesList } from 'src/_utils/enums/employee.enum';
import { aggregateLookUp } from 'src/_aggregates/helper.aggregate';
import { CreateEmployeeHistoryDto } from './dto/create-employee_history.dto';
import { UpdateEmployeeHistoryDto } from './dto/update-employee_history.dto';
import {
  EmployeeHistory,
  EmployeeHistoryDocument,
} from './entities/employee_history.entity';
import { EmployeeHistoryRepository } from 'src/_repositories/employee_history/employee_history.repository';

@Injectable()
export class EmployeeHistoryService {
  constructor(private employeeHistoryRepository: EmployeeHistoryRepository) {}
  async create(createEmployeeHistoryDto: CreateEmployeeHistoryDto) {
    return await this.employeeHistoryRepository.create(
      createEmployeeHistoryDto,
    );
  }

  async findAll(_params?: any): Promise<EmployeeHistory[]> {
    return await this.employeeHistoryRepository.find(_params);
  }

  async findOne(employeeNo: string, _params?: any) {
    return await this.employeeHistoryRepository.aggregateFindOne(
      employeeNo,
      _params,
    );
  }

  update(
    employeeNo: string,
    updateEmployeeHistoryDto: UpdateEmployeeHistoryDto,
  ) {
    return this.employeeHistoryRepository.findOneAndUpdate(
      { employeeNo },
      { $set: { ...updateEmployeeHistoryDto } },
    );
  }

  remove(employeeNo: string) {
    return this.employeeHistoryRepository.deleteMany({ employeeNo });
  }
}
