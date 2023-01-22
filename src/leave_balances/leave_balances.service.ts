import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { EmployeeRepository } from 'src/employees/employee.repository';
import { CreateLeaveBalanceDto } from 'src/leave_balances/dto/create-leave_balance.dto';
import { LeaveBalance } from 'src/leave_balances/entities/leave_balance.entity';
import { LeaveBalanceRepository } from 'src/_repositories/leave_balance/leave_balance.repository';
import { CONSTANTS } from 'src/_utils/constants/employees';
import * as mongoose from 'mongoose';
import { CONTAINS } from 'class-validator';

@Injectable()
export class LeaveBalanceService {
  constructor(
    private leaveBalanceRepository: LeaveBalanceRepository,
    private employeeRepository: EmployeeRepository,
    @InjectConnection() private readonly connection?: mongoose.Connection,
  ) {}

  @Cron(CONSTANTS.CRON_TIME)
  async handleCron() {
    this.handleResetCron();
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

    const getDaysFromDateHired = (dateHired: Date): number => {
      const date1 = new Date(dateHired);
      const date2 = new Date();

      // To calculate the time difference of two dates
      const Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      return Math.round(Difference_In_Time / (1000 * 3600 * 24));
    };

    const isYearOld = (dateHired: Date): boolean => {
      return getDaysFromDateHired(dateHired) <= 365;
    };

    allEmployee.forEach(async (employee) => {
      const leaveData: any = {
        employeeNo: employee.employeeNo,
        SL: CONSTANTS.SL,
        VL: CONSTANTS.VL,
      };

      if (
        employee.employmentStatus.toLowerCase() === 'active' &&
        employee.employmentType.toLowerCase() === 'regular'
      ) {
        leaveData.SIL = 3;
        leaveData.BRL = 3;
      }

      if (isYearOld(employee.dateHired)) {
        leaveData.BL = CONSTANTS.BL;
        leaveData.NL = CONSTANTS.NL;
        if (employee.gender.toLowerCase() === 'male')
          leaveData.PL = CONSTANTS.PL;
        if (employee.gender.toLowerCase() === 'female')
          leaveData.ML = CONSTANTS.ML;
      }

      const data: CreateLeaveBalanceDto = {
        employeeNo: employee.employeeNo,
        ...leaveData,
      };

      promises.push(this.create(data));
    });

    const response = await Promise.all(promises);
    return response;
  }

  async handleResetCron() {
    const dte = new Date();
    dte.setDate(dte.getDate() + 1);

    const date = new Date();
    const year = date.getFullYear();

    const currentDate = new Date('2023-01-01').toLocaleDateString();

    const curr = `1/1/${year}`;

    if (currentDate === curr) {
      return await this.leaveBalanceRepository.deleteMany({});
    }
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

    const date = new Date('2023-02-01');
    const monthName = month[date.getMonth()];

    const response = await this.leaveBalanceRepository.findOneThenUpdate(
      { employeeNo, applicableMonth: `${monthName}` },
      { ...createLeaveBalanceDto, applicableMonth: `${monthName}` },
    );

    return response;
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
