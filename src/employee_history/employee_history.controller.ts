import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeHistoryService } from './employee_history.service';
import { CreateEmployeeHistoryDto } from './dto/create-employee_history.dto';
import { UpdateEmployeeHistoryDto } from './dto/update-employee_history.dto';
import { EmployeeHistoryResponseHandler } from 'src/response_handler/employee_history_handler.response';

@Controller('employee-history')
export class EmployeeHistoryController {
  constructor(
    private readonly employeeHistoryService: EmployeeHistoryService,
    private readonly employeeHistoryResponseHandler: EmployeeHistoryResponseHandler,
  ) {}

  @Post()
  create(@Body() createEmployeeHistoryDto: CreateEmployeeHistoryDto) {
    return this.employeeHistoryService.create(createEmployeeHistoryDto);
  }

  @Get()
  async findAll(@Query() params) {
    const response = await this.employeeHistoryService.findAll(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.employeeHistoryResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async find(@Param('employeeNo') employeeNo?: string) {
    const response = await this.employeeHistoryService.find(employeeNo);

    if (!response || response.length < 1) {
      return response;
    }
    return this.employeeHistoryResponseHandler.ok(response);
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
