import { Injectable } from '@nestjs/common';
import { OBRequestRepository } from 'src/_repositories/ob_request/ob_request.repository';
import { CreateOBRequestDto } from './dto/create-ob_request.dto';
import { UpdateOBRequestDto } from './dto/update-ob_request.dto';
import { OBRequest } from './entities/ob_request.entity';

@Injectable()
export class OBRequestService {
  constructor(private oBRequestRepository: OBRequestRepository) {}

  async create(createOBRequestDto: CreateOBRequestDto): Promise<OBRequest> {
    return await this.oBRequestRepository.create(createOBRequestDto);
  }

  async aggregateFind(_params?: any): Promise<OBRequest[]> {
    return this.oBRequestRepository.aggregateFind(_params);
  }

  async aggregateFindByAttribute(_params?: any): Promise<OBRequest[]> {
    return this.oBRequestRepository.aggregateFindByAttribute(_params);
  }

  async findOne(id: string): Promise<any> {
    const response = await this.oBRequestRepository.aggregateFindOne({
      id,
    });
    return response;
  }

  async update(id: string, updateOBRequestDto: UpdateOBRequestDto) {
    updateOBRequestDto['lastModifiedDate'] = Date.now();
    const filter = { id };
    const update = updateOBRequestDto;

    return await this.oBRequestRepository.findOneAndUpdate(filter, update);
  }

  remove(id: string) {
    return this.oBRequestRepository.deleteOne({ id });
  }
}
