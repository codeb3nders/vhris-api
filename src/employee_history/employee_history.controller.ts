import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeHistoryService } from './employee_history.service';
import { CreateEmployeeHistoryDto } from './dto/create-employee_history.dto';
import { UpdateEmployeeHistoryDto } from './dto/update-employee_history.dto';
import { EmployeeHistoryResponseHandler } from './response_handler/employee_history.response';

@Controller('employee-history')
export class EmployeeHistoryController {
  constructor(
    private readonly employeeHistoryService: EmployeeHistoryService,
  ) {}

  @Post()
  create(@Body() createEmployeeHistoryDto: CreateEmployeeHistoryDto) {
    return this.employeeHistoryService.create(createEmployeeHistoryDto);
  }

  @Get()
  findAll(@Query() params) {
    return this.employeeHistoryService.findAll(params);
  }

  @Get(':employeeNo')
  async find(@Param('employeeNo') employeeNo?: string) {
    const response = await this.employeeHistoryService.find(employeeNo);
    return EmployeeHistoryResponseHandler.ok(response);
  }

  @Patch(':employeeNo')
  update(
    @Param('employeeNo') employeeNo: string,
    @Body() updateEmployeeHistoryDto: UpdateEmployeeHistoryDto,
  ) {
    return this.employeeHistoryService.update(
      employeeNo,
      updateEmployeeHistoryDto,
    );
  }

  @Delete(':employeeNo')
  remove(@Param('employeeNo') employeeNo: string) {
    return this.employeeHistoryService.remove(employeeNo);
  }
}
