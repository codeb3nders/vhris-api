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
import { EmployeeDocumentService } from './employee_documents.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';
import { ValidatorsService } from 'src/_validators/validators.service';
import { ErrorResponse } from 'src/_utils/response_handler/error_response.util';
import { EmployeeDocumentResponseHandler } from 'src/_utils/response_handler/employee_documents_handler.response';

const toCheck = ['documentType'];

@Controller('employee-documents')
export class EmployeeDocumentsController {
  constructor(
    private readonly employeeDocumentsService: EmployeeDocumentService,
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
    const response = await this.employeeDocumentsService.aggregateFind(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.employeeDocumentResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async aggregateFindByEmployeeId(
    @Query() params: any,
    @Param('employeeNo') employeeNo: string,
  ) {
    const response =
      await this.employeeDocumentsService.aggregateFindByEmployeeId(employeeNo);
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
  deleteOne(@Param('id') id: string) {
    return this.employeeDocumentsService.deleteOne(id);
  }
}
