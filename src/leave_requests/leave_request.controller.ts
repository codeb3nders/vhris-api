import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { CreateLeaveRequestDto } from './dto/create-leave_request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave_request.dto';
import { ApiTags } from '@nestjs/swagger';
import { LeaveRequest } from './entities/leave_request.entity';
import { LeaveRequestResponseHandler } from 'src/_utils/response_handler/leave_request_handler.response';
import { ValidatorsService } from 'src/validators/validators.service';

const toCheck = ['leaveType'];

@ApiTags('Leave Request')
@Controller('leave')
export class LeaveRequestController {
  constructor(
    private readonly leaveRequestService: LeaveRequestService,
    private readonly validatorsService: ValidatorsService,
    private leaveRequestResponseHandler: LeaveRequestResponseHandler,
  ) {}

  @Post()
  async create(
    @Body() createLeaveRequestDto: CreateLeaveRequestDto,
  ): Promise<LeaveRequest> {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createLeaveRequestDto,
        toCheck,
      );
      return await this.leaveRequestService.create(createLeaveRequestDto);
    } catch (error) {
      return error.message || error;
    }
  }

  @Get()
  async findAll(@Query() params): Promise<LeaveRequest[]> {
    const response = await this.leaveRequestService.aggregateFind(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.leaveRequestResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async find(@Param('employeeNo') employeeNo: string) {
    const response = await this.leaveRequestService.aggregateFind(employeeNo);
    if (!response || response.length < 1) {
      return response;
    }
    return this.leaveRequestResponseHandler.ok(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeaveRequestDto: UpdateLeaveRequestDto,
  ) {
    return await this.leaveRequestService.update(id, updateLeaveRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveRequestService.remove(id);
  }
}
