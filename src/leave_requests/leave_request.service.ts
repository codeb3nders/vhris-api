import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeaveRequestRepository } from 'src/_repositories/leave_request/leave_request.repository';
import { CreateLeaveRequestDto } from './dto/create-leave_request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave_request.dto';
import { LeaveRequest } from './entities/leave_request.entity';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectModel(LeaveRequest.name)
    private leaveRequestRepository: LeaveRequestRepository,
  ) {}
  async create(createLeaveRequestDto: CreateLeaveRequestDto) {
    return await this.leaveRequestRepository.create(createLeaveRequestDto);
  }

  async findAll(): Promise<LeaveRequest[]> {
    return await this.leaveRequestRepository.find();
  }

  async find(employeeNo: string): Promise<LeaveRequest[]> {
    return await this.leaveRequestRepository.find({ employeeNo });
  }

  async update(id: string, updateLeaveRequestDto: UpdateLeaveRequestDto) {
    updateLeaveRequestDto['lastModifiedDate'] = Date.now();
    const filter = { id };
    const update = updateLeaveRequestDto;

    return await this.leaveRequestRepository.findOneAndUpdate(filter, update);
  }

  remove(id: string) {
    return this.leaveRequestRepository.deleteOne({ id });
  }
}
