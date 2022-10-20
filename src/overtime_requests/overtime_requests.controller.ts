import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OvertimeRequestsService } from './overtime_requests.service';
import { CreateOvertimeRequestDto } from './dto/create-overtime_request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime_request.dto';
import { OvertimeRequest } from './entities/overtime_request.entity';
import { ErrorResponse } from 'src/utils/response_handler/error_response.util';
import { ApiTags } from '@nestjs/swagger';
import { OvertimeRequestResponseHandler } from 'src/utils/response_handler/overtime_request_handler.response';

@ApiTags('Overtime Requests')
@Controller('overtime')
export class OvertimeRequestsController {
  constructor(
    private readonly overtimeRequestsService: OvertimeRequestsService,
    private readonly overtimeRequestResponseHandler: OvertimeRequestResponseHandler,
  ) {}

  @Post()
  async create(@Body() overtimeLeaveRequestDto: CreateOvertimeRequestDto) {
    try {
      return await this.overtimeRequestsService.create(overtimeLeaveRequestDto);
    } catch (error) {
      return error.message || error;
    }
  }

  @Get()
  async findAll(): Promise<OvertimeRequest[]> {
    try {
      const response = await this.overtimeRequestsService.findAll();
      return this.overtimeRequestResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get('/employee')
  async findAllWithEmployeeDetails(): Promise<OvertimeRequest[]> {
    try {
      const response =
        await this.overtimeRequestsService.findAllWithEmployeeDetails();
      return this.overtimeRequestResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get(':overtimeRequestNo')
  findOne(@Param('overtimeRequestNo') overtimeRequestNo: string) {
    return this.overtimeRequestsService.findOne(overtimeRequestNo);
  }

  @Get('/employee/:overtimeRequestNo')
  findByIdWithEmployeeDetails(
    @Param('overtimeRequestNo') overtimeRequestNo: string,
  ) {
    return this.overtimeRequestsService.findByIdWithEmployeeDetails(
      overtimeRequestNo,
    );
  }

  @Patch(':overtimeRequestNo')
  update(
    @Param('overtimeRequestNo') overtimeRequestNo: string,
    @Body() updateLeaveDto: UpdateOvertimeRequestDto,
  ) {
    return this.overtimeRequestsService.update(
      overtimeRequestNo,
      updateLeaveDto,
    );
  }

  @Delete(':overtimeRequestNo')
  remove(@Param('overtimeRequestNo') overtimeRequestNo: string) {
    return this.overtimeRequestsService.remove(overtimeRequestNo);
  }
}
