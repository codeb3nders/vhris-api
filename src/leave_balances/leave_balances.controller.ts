import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { LeaveBalanceResponseHandler } from 'src/_utils/response_handler/leave_balance_handler.response';
import { CreateLeaveBalanceDto, DateDto } from './dto/create-leave_balance.dto';
import { LeaveBalanceService } from './leave_balances.service';

@Controller('leave-balance')
export class LeaveBalanceController {
  constructor(
    private readonly leaveBalanceService: LeaveBalanceService,
    private readonly leaveBalanceResponseHandler: LeaveBalanceResponseHandler,
    private readonly employeeService: EmployeesService,
  ) {}

  @Post()
  create(@Body() createLeaveBalanceDto: CreateLeaveBalanceDto) {
    return this.leaveBalanceService.create(createLeaveBalanceDto);
  }

  @Post('run-cron-job/')
  async runCronJob(@Body() dateDto: DateDto) {
    const response: any = await this.leaveBalanceService.handleCron(
      dateDto.date,
    );

    return this.leaveBalanceResponseHandler.ok(response);
  }

  @Get('run-reset-cron-job')
  async runResetCronJob() {
    const response: any = await this.leaveBalanceService.handleResetCron();

    return this.leaveBalanceResponseHandler.ok(response);
  }

  @Get()
  async findAll(@Query() params) {
    const response: any = await this.leaveBalanceService.aggregateFind(params);

    if (!response || response.length < 1) {
      return response;
    }
    return this.leaveBalanceResponseHandler.ok(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.leaveBalanceService.findOne(id);
    if (!response || response.length < 1) {
      return response;
    }
    return this.leaveBalanceResponseHandler.ok(response);
  }

  @Get('employee/:employeeNo')
  async findByAttribute(@Param('employeeNo') employeeNo: string) {
    const response = await this.leaveBalanceService.aggregateFindByAttribute({
      employeeNo,
    });

    if (!response || response.length < 1) {
      return response;
    }
    return this.leaveBalanceResponseHandler.ok(response);
  }
}
