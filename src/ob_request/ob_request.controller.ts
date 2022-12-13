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
import { OBRequestResponseHandler } from 'src/_utils/response_handler/ob_request_handler.response';
import { CreateOBRequestDto } from './dto/create-ob_request.dto';
import { UpdateOBRequestDto } from './dto/update-ob_request.dto';
import { OBRequest } from './entities/ob_request.entity';
import { OBRequestService } from './ob_request.service';

const toCheck = ['OBreasonOfDisapproval'];

@ApiTags('OB Request')
@Controller('ob')
export class OBRequestController {
  constructor(
    private readonly obRequestService: OBRequestService,
    private readonly validatorsService: ValidatorsService,
    private obRequestResponseHandler: OBRequestResponseHandler,
  ) {}

  @Post()
  async create(
    @Body() createOBRequestDto: CreateOBRequestDto,
  ): Promise<OBRequest> {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createOBRequestDto,
        toCheck,
      );
      return await this.obRequestService.create(createOBRequestDto);
    } catch (error) {
      return error.message || error;
    }
  }

  @Get()
  async findAll(@Query() params): Promise<OBRequest[]> {
    const response = await this.obRequestService.aggregateFind(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.obRequestResponseHandler.ok(response);
  }

  @Get('employee/:employeeNo')
  async find(@Param('employeeNo') employeeNo: string) {
    const response = await this.obRequestService.aggregateFind({
      employeeNo,
    });
    if (!response || response.length < 1) {
      return response;
    }
    return this.obRequestResponseHandler.ok(response);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const response = await this.obRequestService.aggregateFind({
      id,
    });
    if (!response || response.length < 1) {
      return response;
    }
    return this.obRequestResponseHandler.ok(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOBRequestDto: UpdateOBRequestDto,
  ) {
    await this.validatorsService.validateEmployeesPostRequest(
      updateOBRequestDto,
      toCheck,
    );
    return await this.obRequestService.update(id, updateOBRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obRequestService.remove(id);
  }
}
