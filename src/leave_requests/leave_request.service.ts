import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeaveRequestDto } from './dto/create-leave_request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave_request.dto';
import { Leave_request, LeaveRequestDocument } from './entities/leave_request.entity';

@Injectable()
export class LeaveRequestService {
  constructor(@InjectModel(Leave_request.name) private leaveRequestModel: Model<LeaveRequestDocument>) {}
  create(createLeaveRequestDto: CreateLeaveRequestDto) {
    const createLeaveRequest = new this.leaveRequestModel(createLeaveRequestDto);
    return createLeaveRequest.save();
  }

  findAll() {
    return this.leaveRequestModel.find().exec();
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

    const results =  await this.leaveRequestModel.aggregate(pipeline)
    
   
    return results
  }

  findByIdWithEmployeeDetails(leaveRequestNo:string) {
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
          'leaveRequestNo': leaveRequestNo
        }
      }
    ]

    return this.leaveRequestModel.aggregate(pipeline)
  }

  findOne(leaveRequestNo: string) {
    return this.leaveRequestModel.findOne({leaveRequestNo})
  }

  update(leaveRequestNo: string, updateLeaveDto: UpdateLeaveRequestDto) {
    return this.leaveRequestModel.updateOne({leaveRequestNo}, {$set:{...updateLeaveDto}})
  }

  remove(leaveRequestNo: string) {
    return this.leaveRequestModel.deleteOne({leaveRequestNo})
  }
}
