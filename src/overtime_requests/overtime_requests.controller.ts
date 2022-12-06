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
import { ApiTags } from '@nestjs/swagger';
import { ValidatorsService } from 'src/validators/validators.service';
import { OvertimeRequestResponseHandler } from 'src/_utils/response_handler/overtime_request_handler.response';
import { CreateOvertimeRequestDto } from './dto/create-overtime_request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime_request.dto';
import { OvertimeRequest } from './entities/overtime_request.entity';
import { OvertimeRequestService } from './overtime_requests.service';

const toCheck = ['OTreasonOfDisapproval'];

@ApiTags('Overtime Request')
@Controller('overtime')
export class OvertimeRequestController {
  constructor(
    private readonly overtimeRequestService: OvertimeRequestService,
    private readonly validatorsService: ValidatorsService,
    private overtimeRequestResponseHandler: OvertimeRequestResponseHandler,
  ) {}

  @Post()
  async create(
    @Body() createOvertimeRequestDto: CreateOvertimeRequestDto,
  ): Promise<OvertimeRequest> {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createOvertimeRequestDto,
        toCheck,
      );
      return await this.overtimeRequestService.create(createOvertimeRequestDto);
    } catch (error) {
      return error.message || error;
    }
  }

  @Get()
  async findAll(@Query() params): Promise<OvertimeRequest[]> {
    const response = await this.overtimeRequestService.aggregateFind(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.overtimeRequestResponseHandler.ok(response);
  }

  @Get('employee/:employeeNo')
  async find(@Param('employeeNo') employeeNo: string) {
    const response = await this.overtimeRequestService.aggregateFind({
      employeeNo,
    });
    if (!response || response.length < 1) {
      return response;
    }
    return this.overtimeRequestResponseHandler.ok(response);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const response = await this.overtimeRequestService.aggregateFind({
      id,
    });
    if (!response || response.length < 1) {
      return response;
    }
    return this.overtimeRequestResponseHandler.ok(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOvertimeRequestDto: UpdateOvertimeRequestDto,
  ) {
    await this.validatorsService.validateEmployeesPostRequest(
      updateOvertimeRequestDto,
      toCheck,
    );
    return await this.overtimeRequestService.update(
      id,
      updateOvertimeRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.overtimeRequestService.remove(id);
  }
}
