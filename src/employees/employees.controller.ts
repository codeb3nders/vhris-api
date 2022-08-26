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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { Employee } from './entities/employee.entity';
import { ErrorResponse } from 'src/helpers/error_response';
import {
  EmployeeResponseHandler,
  ResponseHandler,
} from './response_handler/employee.response';
import { EmployeeI } from './interface/employee.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { isAllowedUser, isValidRequest } from './dto/validate.request';
import { AuthUser } from 'src/auth/jwt.helper';
import { CONSTANTS } from 'src/constants/employees';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
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

  @UseGuards(JwtAuthGuard)
  @Get('/leaves/')
  async findAllLeaves(): Promise<EmployeeI[]> {
    try {
      const response = await this.employeesService.findAllWithLeaves();
      return EmployeeResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/leaves/:employeeNo')
  async findAllLeavesById(@Param('employeeNo') employeeNo: string) {
    const response = await this.employeesService.findAllLeavesById(employeeNo);
    return EmployeeResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':employeeNo')
  async findOne(@Param('employeeNo') employeeNo: string): Promise<EmployeeI> {
    const response = await this.employeesService.findOne(employeeNo);
    return ResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':employeeNo')
  async update(
    @AuthUser() user: any,
    @Param('employeeNo') employeeNo: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    isValidRequest(updateEmployeeDto, user);
    const employee = await this.employeesService.findOne(employeeNo);
    if (!employee)
      throw new HttpException('Not Modified!', HttpStatus.NOT_MODIFIED);
    return await this.employeesService.update(employeeNo, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':employeeNo')
  remove(@AuthUser() user: any, @Param('employeeNo') employeeNo: string) {
    isAllowedUser(user, CONSTANTS.HR_ADMIN);
    return this.employeesService.remove(employeeNo);
  }
}
