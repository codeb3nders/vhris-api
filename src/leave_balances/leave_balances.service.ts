import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserLogsService } from 'src/user_logs/user_logs.service';
import { CreateLeaveBalanceDto } from './dto/create-leave_balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave_balance.dto';

@Injectable()
export class LeaveBalancesService {
  private readonly logger = new Logger(UserLogsService.name);

  // @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Run Create Job');
    this.create();
  }

  create(createLeaveBalanceDto?: CreateLeaveBalanceDto) {
    console.log('CREATE');
    return 'This action adds a new leaveBalance';
  }

  findAll() {
    return `This action returns all leaveBalances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaveBalance`;
  }

  update(id: number, updateLeaveBalanceDto: UpdateLeaveBalanceDto) {
    return `This action updates a #${id} leaveBalance`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaveBalance`;
  }
}
