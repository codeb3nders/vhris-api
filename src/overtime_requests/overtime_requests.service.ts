import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOvertimeRequestDto } from './dto/create-overtime_request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime_request.dto';
import { OvertimeRequestDocument, Overtime_request } from './entities/overtime_request.entity';

@Injectable()
export class OvertimeRequestsService {

  constructor(@InjectModel(Overtime_request.name) private overtimeRequestModel: Model<OvertimeRequestDocument>) {}

  create(createOvertimeRequestDto: CreateOvertimeRequestDto) {
    const createOvertimeRequest = new this.overtimeRequestModel(createOvertimeRequestDto);
    return createOvertimeRequest.save();
  }

  findAll() {
    return this.overtimeRequestModel.find().exec();
  }

  async findAllWithEmployeeDetails() {
    const pipeline = [
      {
        '$lookup': {
          'from': 'employees', 
          'localField': 'employeeNo', 
          'foreignField': 'employeeNo', 
          'as': 'employee'
        }
      }
    ]

    const results =  await this.overtimeRequestModel.aggregate(pipeline)
    
   
    return results
  }

  findByIdWithEmployeeDetails(overtimeRequestNo:string) {
    const pipeline = [
      {
        '$lookup': {
          'from': 'employees', 
          'localField': 'employeeNo', 
          'foreignField': 'employeeNo', 
          'as': 'employee'
        }
      }, {
        '$match': {
          'overtimeRequestNo': overtimeRequestNo
        }
      }
    ]

    return this.overtimeRequestModel.aggregate(pipeline)
  }

  findOne(overtimeRequestNo: string) {
    return this.overtimeRequestModel.findOne({overtimeRequestNo})
  }

  update(overtimeRequestNo: string, updateLeaveDto: UpdateOvertimeRequestDto) {
    return this.overtimeRequestModel.updateOne({overtimeRequestNo}, {$set:{...updateLeaveDto}})
  }

  remove(overtimeRequestNo: string) {
    return this.overtimeRequestModel.deleteOne({overtimeRequestNo})
  }
}
