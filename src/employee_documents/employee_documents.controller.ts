import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EmployeeDocumentsService } from './employee_documents.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';
import { ValidatorsService } from 'src/validators/validators.service';
import { ErrorResponse } from 'src/utils/response/error_response.util';
import { UpdateAssetManagementDto } from 'src/asset_management/dto/update-asset_management.dto';
import { employeeDocumentsResponseHandler } from './response_handler/employee_documents.response';
import { EmployeeDocument } from './entities/employee_document.entity';

const toCheck = ['documentType'];

@Controller('employee-documents')
export class EmployeeDocumentsController {
  constructor(
    private readonly employeeDocumentsService: EmployeeDocumentsService,
    private readonly validatorService: ValidatorsService,
  ) {}

  @Post()
  async create(@Body() createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    try {
      await this.validatorService.validateEmployeesPostRequest(
        createEmployeeDocumentDto,
        toCheck,
      );

      return this.employeeDocumentsService.create(createEmployeeDocumentDto);
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @Get()
  async findAll(@Query() params) {
    const response = await this.employeeDocumentsService.findAll(params);
    if (!response || response.length < 1) {
      return response;
    }
    return employeeDocumentsResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async find(@Query() params: any, @Param('employeeNo') employeeNo: string) {
    const response = await this.employeeDocumentsService.find(employeeNo);
    if (!response || response.length < 1) {
      return response;
    }
    return employeeDocumentsResponseHandler.ok(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDocumentDto: UpdateEmployeeDocumentDto,
  ) {
    await this.validatorService.validateEmployeesPostRequest(
      updateEmployeeDocumentDto,
      toCheck,
    );

    return await this.employeeDocumentsService.update(
      id,
      updateEmployeeDocumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeDocumentsService.remove(id);
  }
}
