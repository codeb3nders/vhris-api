import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}
  
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee>{
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    console.log({createEmployeeDto, createdEmployee})
    return await createdEmployee.save();
   
   
  }

  async findAll():Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findAllWithLeaves():Promise<any>{
    const pipeline = [
      {
        '$lookup': {
          'from': 'leave_requests', 
          'localField': 'employeeNo', 
          'foreignField': 'employeeNo', 
          'as': 'leave_requests'
        }
      }
    ]

    return this.employeeModel.aggregate(pipeline)
  }

  async findAllLeavesById(employeeNo:string):Promise<any>{
    const pipeline = [
      {
        '$lookup': {
          'from': 'l', 
          'localField': 'employeeNo', 
          'foreignField': 'employeeNo', 
          'as': 'leave_requests'
        }
      }, {
        '$match': {
          'employeeNo': employeeNo
        }
      }
    ]

    return this.employeeModel.aggregate(pipeline)
  }


  async findOne(employeeNo: string) {
    return this.employeeModel.findOne({employeeNo})
  }

  async update(employeeNo: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.updateOne({employeeNo}, {$set:{...updateEmployeeDto}})
  }

  async remove(employeeNo: string) {
    return this.employeeModel.deleteOne({employeeNo})
  }
}
