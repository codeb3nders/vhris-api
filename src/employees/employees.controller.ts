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
  Query,
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
import { isAllowedUser, isValidRequest } from './dto/validate.request';
import { AuthUser } from 'src/auth/jwt.helper';
import { CONSTANTS } from 'src/constants/employees';
import { ValidatorsService } from 'src/validators/validators.service';
import { FindOneEmployeeDto } from './dto/findOne-employee.dto';
import { EmployeeHistoryService } from 'src/employee_history/employee_history.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private validatorsService: ValidatorsService,
    private employeeHistoryService: EmployeeHistoryService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createEmployeeDto,
      );

      return await this.employeesService.create(createEmployeeDto);
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() params): Promise<EmployeeI[]> {
    const response = await this.employeesService.findAll(params);

    if (!response || response.length < 1) {
      throw new HttpException('No Record found!', HttpStatus.OK);
    }
    return EmployeeResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':employeeNo')
  async findOne(
    @Query() params: FindOneEmployeeDto,
    @Param('employeeNo') employeeNo: string,
  ): Promise<EmployeeI[]> {
    const response = await this.employeesService.findOne(employeeNo, params);
    if (!response || response.length < 1) {
      throw new HttpException('No Record found!', HttpStatus.OK);
    }
    return EmployeeResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':employeeNo')
  async update(
    @AuthUser() user: any,
    @Param('employeeNo') employeeNo: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    isValidRequest(updateEmployeeDto, user);
    await this.validatorsService.validateEmployeesPostRequest(
      updateEmployeeDto,
    );
    const type = updateEmployeeDto.type;
    const effectiveDate = updateEmployeeDto.effectiveDate;
    const remarks = updateEmployeeDto?.remarks || null;

    // if (!type)
    //   throw new HttpException('Missing Property!', HttpStatus.BAD_REQUEST);

    const employee = await this.employeesService.findOne(employeeNo);
    if (!employee)
      throw new HttpException('Not Modified!', HttpStatus.NOT_MODIFIED);
    const response = await this.employeesService.update(
      employeeNo,
      updateEmployeeDto,
    );
    if (response) {
      const previousValue = {};

      Object.keys(updateEmployeeDto).forEach((item) => {
        if (item !== 'lastModifiedDate' && item !== 'type') {
          previousValue[item] = employee[item];
        }
      });
      if (type) {
        const history = {
          employeeNo: employeeNo,
          type: type,
          effectiveDate,
          remarks,
          details: previousValue,
        };
        try {
          this.employeeHistoryService.create(history);
        } catch (error) {
          throw new HttpException(
            'History Saving failed!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
    return { response };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':employeeNo')
  remove(@AuthUser() user: any, @Param('employeeNo') employeeNo: string) {
    isAllowedUser(user, CONSTANTS.HR_ADMIN);
    return this.employeesService.remove(employeeNo);
  }
}
