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

  // @Cron(CONSTANTS.CRON_TIME)
  async handleCron() {
    const dte = new Date();
    dte.setDate(dte.getDate() + 1);

    const allEmployee = await this.employeeRepository.find({
      isActive: true,
      $or: [
        { employmentType: CONSTANTS.EMPLOYMENT_TYPE_REGULAR },
        {
          endOfProbationary: {
            $lte: dte,
          },
        },
      ],
    });

    if (!allEmployee.length) return 'NO EMPLOYEE FOUND';

    const promises = [];

    allEmployee.forEach(async (employee) => {
      const data: CreateLeaveBalanceDto = {
        employeeNo: employee.employeeNo,
        leaveBalance: CONSTANTS.LEAVE_BALANCE,
      };

      promises.push(this.create(data));
    });

    return Promise.all(promises);
  }

  async create(
    createLeaveBalanceDto: CreateLeaveBalanceDto,
  ): Promise<LeaveBalance> {
    const { employeeNo } = createLeaveBalanceDto;

    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date();
    const year = date.getFullYear();
    const monthName = month[date.getMonth()];

    return await this.leaveBalanceRepository.upsert(
      { employeeNo, applicableMonth: `${monthName}_${year}` },
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
