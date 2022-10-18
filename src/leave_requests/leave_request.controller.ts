import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { CreateLeaveRequestDto } from './dto/create-leave_request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave_request.dto';
import { ApiTags } from '@nestjs/swagger';
import { LeaveRequest } from './entities/leave_request.entity';
import { ErrorResponse } from 'src/_utils/response_handler/error_response.util';
import { LeaveRequestResponseHandler } from 'src/_utils/response_handler/leave_request_handler.response';

@ApiTags('Leave Request')
@Controller('leave')
export class LeaveRequestController {
  constructor(
    private readonly leaveRequestService: LeaveRequestService,
    private leaveRequestResponseHandler: LeaveRequestResponseHandler,
  ) {}

  @Post()
  async create(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    // TODO: Validation
    try {
      return await this.leaveRequestService.create(createLeaveRequestDto);
    } catch (error) {
      return error.message || error;
    }
  }

  @Get()
  async findAll(): Promise<LeaveRequest[]> {
    try {
      const response = await this.leaveRequestService.findAll();
      return this.leaveRequestResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get('/employee')
  async findAllWithEmployeeDetails(): Promise<LeaveRequest[]> {
    try {
      const response =
        await this.leaveRequestService.findAllWithEmployeeDetails();
      return this.leaveRequestResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get(':leaveRequestNo')
  findOne(@Param('leaveRequestNo') leaveRequestNo: string) {
    return this.leaveRequestService.findOne(leaveRequestNo);
  }

  @Get('/employee/:leaveRequestNo')
  findByIdWithEmployeeDetails(@Param('leaveRequestNo') leaveRequestNo: string) {
    return this.leaveRequestService.findByIdWithEmployeeDetails(leaveRequestNo);
  }

  @Patch(':leaveRequestNo')
  update(
    @Param('leaveRequestNo') leaveRequestNo: string,
    @Body() updateLeaveDto: UpdateLeaveRequestDto,
  ) {
    return this.leaveRequestService.update(leaveRequestNo, updateLeaveDto);
  }

  @Delete(':leaveRequestNo')
  remove(@Param('leaveRequestNo') leaveRequestNo: string) {
    return this.leaveRequestService.remove(leaveRequestNo);
  }
}
