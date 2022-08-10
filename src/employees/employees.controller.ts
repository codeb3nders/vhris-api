import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { Employee } from './entities/employee.entity';
import { ErrorResponse } from 'src/helpers/error_response';
import { EmployeeResponseHandler } from './response_handler/employee.response';
import { EmployeeI } from './interface/employee.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    console.log('DTO', createEmployeeDto);
    try {
      return await this.employeesService.create(createEmployeeDto);
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<EmployeeI[]> {
    try {
      const response = await this.employeesService.findAll();
      return EmployeeResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get('/leaves/')
  async findAllLeaves(): Promise<EmployeeI[]> {
    try {
      const response = await this.employeesService.findAllWithLeaves();
      return EmployeeResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get('/leaves/:employeeNo')
  findAllLeavesById(@Param('employeeNo') employeeNo: string) {
    return this.employeesService.findAllLeavesById(employeeNo);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':employeeNo')
  findOne(@Param('employeeNo') employeeNo: string) {
    return this.employeesService.findOne(employeeNo);
  }

  @Patch(':employeeNo')
  update(
    @Param('employeeNo') employeeNo: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(employeeNo, updateEmployeeDto);
  }

  @Delete(':employeeNo')
  remove(@Param('employeeNo') employeeNo: string) {
    return this.employeesService.remove(employeeNo);
  }
}
