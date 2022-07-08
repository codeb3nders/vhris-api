import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave_types, LeaveTypesDocument } from './entities/leave_types.entity';
import { CreateLeaveTypeDto } from './dto/create-leave_type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave_type.dto';

@Injectable()
export class LeaveTypeService {
  constructor(@InjectModel(Leave_types.name) private leaveTypesModel: Model<LeaveTypesDocument>) {}
  
  async create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<Leave_types>{
    const createdLeaveTypes = new this.leaveTypesModel(createLeaveTypeDto);

    console.log('- - - - - - ',createLeaveTypeDto, createdLeaveTypes)
    return await createdLeaveTypes.save();
   
   
  }

  async findAll():Promise<Leave_types[]> {
    return this.leaveTypesModel.find().exec();
  }

  

  async findOne(employeeNo: string) {
    return this.leaveTypesModel.findOne({employeeNo})
  }

  async update(employeeNo: string, updateEmployeeDto: UpdateLeaveTypeDto) {
    return this.leaveTypesModel.updateOne({employeeNo}, {$set:{...updateEmployeeDto}})
  }

  async remove(employeeNo: string) {
    return this.leaveTypesModel.deleteOne({employeeNo})
  }
}
