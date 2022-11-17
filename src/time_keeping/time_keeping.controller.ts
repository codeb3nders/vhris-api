import { isNil } from 'lodash';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeKeepingService } from './time_keeping.service';
import { CreateTimeKeepingDto } from './dto/create-time_keeping.dto';
import { UpdateTimeKeepingDto } from './dto/update-time_keeping.dto';
import { EmployeesService } from 'src/employees/employees.service';

@Controller('time-keeping')
export class TimeKeepingController {
  constructor(
    private readonly timeKeepingService: TimeKeepingService,
    private readonly employeeService: EmployeesService,
  ) {}

  @Post()
  async create(@Body() createTimeKeepingsDto: CreateTimeKeepingDto[]) {
    const fail = [];
    const success = [];
    for (const createTimeKeepingDto of createTimeKeepingsDto) {
      try {
        const employee = await this.employeeService.search({
          name: createTimeKeepingDto.employeeName,
        });

        if (employee.length > 0 && employee[0].employeeNo) {
          createTimeKeepingDto.employeeNo = employee[0].employeeNo;
        } else {
          createTimeKeepingDto.employeeNo = null;
        }

        const response = await this.timeKeepingService.create(
          createTimeKeepingDto,
        );
        success.push(response);
      } catch (error) {
        fail.push({
          errorMessage: error.message || error,
          details: createTimeKeepingDto,
        });
      }
    }

    return { success, fail };
  }

  @Get()
  findAll() {
    return this.timeKeepingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeKeepingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeKeepingDto: UpdateTimeKeepingDto,
  ) {
    return this.timeKeepingService.update(id, updateTimeKeepingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeKeepingService.remove(id);
  }
}
