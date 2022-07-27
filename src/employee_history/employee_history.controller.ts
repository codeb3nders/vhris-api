import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeHistoryService } from './employee_history.service';
import { CreateEmployeeHistoryDto } from './dto/create-employee_history.dto';
import { UpdateEmployeeHistoryDto } from './dto/update-employee_history.dto';

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
  findAll() {
    return this.employeeHistoryService.findAll();
  }

  @Get(':employeeNo')
  findOne(@Param('employeeNo') employeeNo: string) {
    return this.employeeHistoryService.findOne(employeeNo);
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
