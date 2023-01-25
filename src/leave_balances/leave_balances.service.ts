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
  async handleCron(date?: Date) {
    if (this.checkDate()) {
      await this.handleResetCron();

      setTimeout(() => {
        return this.runCron(date);
      }, 10000); // Allow 20 seconds to clear all leave balances

      return {};
    } else {
      return this.runCron(date);
    }
  }

  async runCron(date?: Date) {
    console.log('Add leave balance');
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

      const Difference_In_Time = date2.getTime() - date1.getTime();

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

      promises.push(this.create(data, date));
    });

    const response = await Promise.all(promises);
    return response;
  }

  checkDate() {
    const dte = new Date();
    dte.setDate(dte.getDate() + 1);

    const date = new Date();
    const year = date.getFullYear();

    const currentDate = new Date('2023-01-01').toLocaleDateString(); // TEST HERE FOR RESET DATE

    const curr = `1/1/${year}`;

    return currentDate === curr;
  }

  async handleResetCron() {
    console.log('Reset leave balance');

    if (this.checkDate()) {
      return await this.leaveBalanceRepository.deleteMany({});
    }
  }

  async create(
    createLeaveBalanceDto: CreateLeaveBalanceDto,
    dte?: Date,
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
    const nDate = dte ? new Date(dte) : new Date();

    const date = nDate;
    const monthName = month[date.getMonth()];

    const response = await this.leaveBalanceRepository.findOneThenUpdate(
      { employeeNo },
      { ...createLeaveBalanceDto, applicableMonth: monthName.toUpperCase() },
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
