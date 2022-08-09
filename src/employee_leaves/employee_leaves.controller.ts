import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeLeavesService } from './employee_leaves.service';
import { createEmployeeLeaveDto } from './dto/create-employee_leave.dto';
import { UpdateEmployeeleaveDto } from './dto/update-employee_leave.dto';

@Controller('employee-leaves')
export class EmployeeLeavesController {
  constructor(private readonly employeeLeavesService: EmployeeLeavesService) {}

  @Post()
  create(@Body() createEmployeeLeaveDto: createEmployeeLeaveDto) {
    return this.employeeLeavesService.create(createEmployeeLeaveDto);
  }

  @Get()
  findAll() {
    return this.employeeLeavesService.findAll();
  }

  @Get(':employeeNo')
  findOne(@Param('employeeNo') employeeNo: string) {
    return this.employeeLeavesService.findOne(employeeNo);
  }

  @Patch(':employeeNo')
  update(
    @Param('employeeNo') employeeNo: string,
    @Body() updateEmployeeLeaveDto: UpdateEmployeeleaveDto,
  ) {
    return this.employeeLeavesService.update(
      employeeNo,
      updateEmployeeLeaveDto,
    );
  }

  @Delete(':employeeNo')
  remove(@Param('employeeNo') employeeNo: string) {
    return this.employeeLeavesService.remove(employeeNo);
  }
}
