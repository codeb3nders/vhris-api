import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmployeeRepository } from 'src/employees/employee.repository';
import { CreateLeaveBalanceDto } from 'src/leave_balances/dto/create-leave_balance.dto';
import { LeaveBalance } from 'src/leave_balances/entities/leave_balance.entity';
import { LeaveBalanceRepository } from 'src/_repositories/leave_balance/leave_balance.repository';
import { CONSTANTS } from 'src/_utils/constants/employees';

@Injectable()
export class LeaveBalanceService {
  constructor(
    private leaveBalanceRepository: LeaveBalanceRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  @Cron(CONSTANTS.CRON_TIME)
  async handleCron() {
    const allEmployee = await this.employeeRepository.find({
      isActive: true,
      employmentType: CONSTANTS.EMPLOYMENT_TYPE_REGULAR,
    });

    if (!allEmployee.length) return 'NO EMPLOYEE FOUND';

    allEmployee.forEach((employee) => {
      const data: CreateLeaveBalanceDto = {
        employeeNo: employee.employeeNo,
        leaveBalance: CONSTANTS.LEAVE_BALANCE,
      };

      this.create(data);
    });
  }

  async create(
    createLeaveBalanceDto: CreateLeaveBalanceDto,
  ): Promise<LeaveBalance> {
    const employeeNo = createLeaveBalanceDto.employeeNo;

    return await this.leaveBalanceRepository.upsert(
      { employeeNo },
      createLeaveBalanceDto,
    );
  }

  async aggregateFind(_params?: any): Promise<LeaveBalance[]> {
    return this.leaveBalanceRepository.aggregateFind(_params);
  }

  async aggregateFindByAttribute(_params?: any): Promise<LeaveBalance[]> {
    return this.leaveBalanceRepository.aggregateFindByAttribute(_params);
  }

  async findOne(id: string): Promise<any> {
    const response = await this.leaveBalanceRepository.aggregateFindOne({ id });
    return response;
  }
}
