import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaveTypeService } from './leave_types.service';
import { CreateLeaveTypeDto } from './dto/create-leave_type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave_type.dto';

import { Leave_types } from './entities/leave_types.entity';
import { ErrorResponse } from 'src/utils/response_handler/error_response.util';
import { LeaveTypesResponseHandler } from './response_handler/leave_types.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Leave_types')
@Controller('leave_types')
export class LeaveTypesController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @Post()
  async create(
    @Body() createLeaveTypeDto: CreateLeaveTypeDto,
  ): Promise<Leave_types> {
    // TODO: Add validation

    try {
      return await this.leaveTypeService.create(createLeaveTypeDto);
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @Get()
  async findAll(): Promise<any[]> {
    try {
      const response = await this.leaveTypeService.findAll();
      return LeaveTypesResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get(':typeId')
  findOne(@Param('typeId') typeId: string) {
    return this.leaveTypeService.findOne(typeId);
  }

  @Patch(':typeId')
  update(
    @Param('typeId') typeId: string,
    @Body() updateEmployeeDto: UpdateLeaveTypeDto,
  ) {
    return this.leaveTypeService.update(typeId, updateEmployeeDto);
  }

  @Delete(':typeId')
  remove(@Param('typeId') typeId: string) {
    return this.leaveTypeService.remove(typeId);
  }
}
