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
import { Leave_request } from './entities/leave_request.entity';
import { LeaveRequestResponseHandler } from './response_handler/leave_request.response';
import { ErrorResponse } from 'src/helpers/error_response';

@ApiTags('Leave Request')
@Controller('leave')
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

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
  async findAll(): Promise<Leave_request[]> {
    try {
      const response = await this.leaveRequestService.findAll();
      return LeaveRequestResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get('/employee')
  async findAllWithEmployeeDetails(): Promise<Leave_request[]> {
    try {
      const response =
        await this.leaveRequestService.findAllWithEmployeeDetails();
      return LeaveRequestResponseHandler.ok(response);
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
