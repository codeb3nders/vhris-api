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
import { EmployeeDocumentsService } from './employee_documents.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';
import { ValidatorsService } from 'src/validators/validators.service';
import { ErrorResponse } from 'src/utils/response_handler/error_response.util';
import { EmployeeDocumentResponseHandler } from 'src/utils/response_handler/employee_documents_handler.response';

const toCheck = ['documentType'];

@Controller('employee-documents')
export class EmployeeDocumentsController {
  constructor(
    private readonly employeeDocumentsService: EmployeeDocumentsService,
    private readonly validatorService: ValidatorsService,
    private readonly employeeDocumentResponseHandler: EmployeeDocumentResponseHandler,
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
  async find(@Query() params) {
    const response = await this.employeeDocumentsService.find(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.employeeDocumentResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async findByEmployeeId(
    @Query() params: any,
    @Param('employeeNo') employeeNo: string,
  ) {
    const response = await this.employeeDocumentsService.findByEmployeeId(
      employeeNo,
    );
    if (!response || response.length < 1) {
      return response;
    }
    return this.employeeDocumentResponseHandler.ok(response);
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
