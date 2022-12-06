import { Injectable } from '@nestjs/common';
import { OvertimeRequestRepository } from 'src/_repositories/overtime_request/overtime_request.repository';
import { CreateOvertimeRequestDto } from './dto/create-overtime_request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime_request.dto';
import { OvertimeRequest } from './entities/overtime_request.entity';

@Injectable()
export class OvertimeRequestService {
  constructor(private overtimeRequestRepository: OvertimeRequestRepository) {}

  async create(
    createOvertimeRequestDto: CreateOvertimeRequestDto,
  ): Promise<OvertimeRequest> {
    return await this.overtimeRequestRepository.create(
      createOvertimeRequestDto,
    );
  }

  async aggregateFind(_params?: any): Promise<OvertimeRequest[]> {
    return this.overtimeRequestRepository.aggregateFind(_params);
  }

  async aggregateFindByAttribute(_params?: any): Promise<OvertimeRequest[]> {
    return this.overtimeRequestRepository.aggregateFindByAttribute(_params);
  }

  async findOne(id: string): Promise<any> {
    const response = await this.overtimeRequestRepository.aggregateFindOne({
      id,
    });
    return response;
  }

  async update(id: string, updateOvertimeRequestDto: UpdateOvertimeRequestDto) {
    updateOvertimeRequestDto['lastModifiedDate'] = Date.now();
    const filter = { id };
    const update = updateOvertimeRequestDto;

    return await this.overtimeRequestRepository.findOneAndUpdate(
      filter,
      update,
    );
  }

  remove(id: string) {
    return this.overtimeRequestRepository.deleteOne({ id });
  }
}
