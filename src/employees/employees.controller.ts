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
import { ErrorResponse } from 'src/_utils/response_handler/error_response.util';
import { EmployeeI } from './interface/employee.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import {
  isAllowedUser,
  isValidRequest,
} from '../validators/validate.request.util';
import { AuthUser } from 'src/auth/jwt.helper';
import { CONSTANTS } from 'src/_utils/constants/employees';
import { ValidatorsService } from 'src/validators/validators.service';
import { FindOneEmployeeDto } from './dto/findOne-employee.dto';
import { EmployeeHistoryService } from 'src/employee_history/employee_history.service';
import { EmployeesResponseHandler } from 'src/_utils/response_handler/employees_handler.response';

const toCheck = [
  'citizenship',
  'userGroup',
  'civilStatus',
  // 'religion',
  //'educationalBackground',
  //'payrollBankAccount',
  'position',
  'department',
  'location',
  'employmentStatus',
  'employmentType',
  'rank',
  // 'paymentMethod',
  // 'deductPhilhealth',
  // 'fixedContributionRate',
];

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly validatorsService: ValidatorsService,
    private readonly employeeHistoryService: EmployeeHistoryService,
    private readonly employeesResponseHandler: EmployeesResponseHandler,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createEmployeeDto,
        toCheck,
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
      return [];
    }
    return this.employeesResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query() params: { name: string }): Promise<EmployeeI[]> {
    const response = await this.employeesService.search(params);

    if (!response || response.length < 1) {
      return [];
    }
    return this.employeesResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':employeeNo')
  async findOne(
    @Query() params: FindOneEmployeeDto,
    @Param('employeeNo') employeeNo: string,
  ): Promise<EmployeeI[]> {
    const response = await this.employeesService.findOne(employeeNo, params);

    if (!response || response.length < 1) {
      return [];
    }
    return this.employeesResponseHandler.ok(response);
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
      toCheck,
    );
    const type = updateEmployeeDto.type;
    const effectiveDate = updateEmployeeDto.effectiveDate;
    const remarks = updateEmployeeDto?.remarks || null;

    const employee = await this.employeesService.findOne(employeeNo);

    if (!employee.length)
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
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':employeeNo')
  remove(@AuthUser() user: any, @Param('employeeNo') employeeNo: string) {
    isAllowedUser(user, CONSTANTS.HR_ADMIN);
    return this.employeesService.remove(employeeNo);
  }
}
