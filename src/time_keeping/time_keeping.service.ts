import { Injectable } from '@nestjs/common';
import { TimeKeepingRepository } from 'src/_repositories/tike_keeping/time_keeping.repository';
import { CreateTimeKeepingDto } from './dto/create-time_keeping.dto';
import { UpdateTimeKeepingDto } from './dto/update-time_keeping.dto';

@Injectable()
export class TimeKeepingService {
  constructor(private timeKeepingRepository: TimeKeepingRepository) {}

  async create(
    createTimeKeepingDto: CreateTimeKeepingDto,
  ): Promise<CreateTimeKeepingDto> {
    return await this.timeKeepingRepository.create(createTimeKeepingDto);
  }

  async findAll(): Promise<CreateTimeKeepingDto[]> {
    return await this.timeKeepingRepository.find();
  }

  async findOne(id: string) {
    return await this.timeKeepingRepository.findOne({ id });
  }

  async update(id: string, updateTimeKeepingDto: UpdateTimeKeepingDto) {
    return await this.timeKeepingRepository.findOneAndUpdate(
      { id },
      updateTimeKeepingDto,
    );
  }

  async remove(id: string) {
    return await this.timeKeepingRepository.deleteOne({ id });
  }
}
