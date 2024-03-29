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
  'religion',
  'position',
  'department',
  'location',
  'employmentStatus',
  'employmentType',
  'rank',
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
  ): Promise<EmployeeI | {}> {
    const response = await this.employeesService.findOne(employeeNo, params);

    if (!response) {
      return {};
    }
    return this.employeesResponseHandler.ok(response);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async update(
    @AuthUser() user: any,
    @Query() entityFilterQuery: any,
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

    const employee = await this.employeesService.findAll(entityFilterQuery);

    if (!employee && employee.length <= 0)
      throw new HttpException('Not Modified!', HttpStatus.NOT_MODIFIED);
    const response = await this.employeesService.updateMany(
      { ...entityFilterQuery },
      updateEmployeeDto,
    );

    if (response) {
      const previousValue = {};

      Object.keys(updateEmployeeDto).forEach((item) => {
        if (item !== 'lastModifiedDate' && item !== 'type') {
          previousValue[item] = employee[0][item];
        }
      });

      if (type && entityFilterQuery.employeeNo) {
        const history = {
          employeeNo: entityFilterQuery.employeeNo,
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
