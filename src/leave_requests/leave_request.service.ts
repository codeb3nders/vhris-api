import { Injectable } from '@nestjs/common';
import { LeaveRequestRepository } from 'src/_repositories/leave_request/leave_request.repository';
import { CreateLeaveRequestDto } from './dto/create-leave_request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave_request.dto';
import { LeaveRequest } from './entities/leave_request.entity';

@Injectable()
export class LeaveRequestService {
  constructor(private leaveRequestRepository: LeaveRequestRepository) {}

  async create(
    createLeaveRequestDto: CreateLeaveRequestDto,
  ): Promise<LeaveRequest> {
    return await this.leaveRequestRepository.create(createLeaveRequestDto);
  }

  async aggregateFind(_params?: any): Promise<LeaveRequest[]> {
    return this.leaveRequestRepository.aggregateFind(_params);
  }

  async aggregateFindByAttribute(_params?: any): Promise<LeaveRequest[]> {
    return this.leaveRequestRepository.aggregateFindByAttribute(_params);
  }

  async findOne(id: string): Promise<any> {
    const response = await this.leaveRequestRepository.aggregateFindOne({
      id,
    });
    return response;
  }

  async update(
    id: string,
    updateLearningDevelopmentDto: UpdateLeaveRequestDto,
  ) {
    updateLearningDevelopmentDto['lastModifiedDate'] = Date.now();
    const filter = { id };
    const update = updateLearningDevelopmentDto;

    return await this.leaveRequestRepository.findOneAndUpdate(filter, update);
  }

  remove(id: string) {
    return this.leaveRequestRepository.deleteOne({ id });
  }
}
