import { Injectable } from '@nestjs/common';
import { UserLogRepository } from 'src/_repositories/user_logs/user_log.repository';
import { CreateUserLogDto } from './dto/create-user_log.dto';
import { UserLog } from './entities/user_log.entity';

@Injectable()
export class UserLogsService {
  constructor(private userLogRepository: UserLogRepository) {}

  async create(createUserLogDto: CreateUserLogDto): Promise<UserLog> {
    return await this.userLogRepository.create(createUserLogDto);
  }

  async aggregateFind(_params?: any): Promise<UserLog[]> {
    return this.userLogRepository.aggregateFind(_params);
  }

  async aggregateFindByAttribute(_params?: any): Promise<UserLog[]> {
    return this.userLogRepository.aggregateFindByAttribute(_params);
  }

  async findOne(id: string): Promise<any> {
    const response = await this.userLogRepository.aggregateFindOne({ id });
    return response;
  }
}
