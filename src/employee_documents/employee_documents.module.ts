import { Module } from '@nestjs/common';
import { EmployeeDocumentsController } from './employee_documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidatorsModule } from 'src/_validators/validators.module';
import {
  EmployeeDocument,
  EmployeeDocumentSchema,
} from './entities/employee_document.entity';
import { ValidatorsService } from 'src/_validators/validators.service';
import { EmployeeDocumentResponseHandler } from 'src/_utils/response_handler/employee_documents_handler.response';
import { AggregateEmployeeDocument } from 'src/_aggregates/employee_documents.aggregate';
import { EmployeeDocumentService } from './employee_documents.service';
import { EmployeeDocumentRepository } from '../_repositories/employee_documents/asset_management.repository';

@Module({
  imports: [
    ValidatorsModule,
    MongooseModule.forFeature([
      {
        name: EmployeeDocument.name,
        schema: EmployeeDocumentSchema,
      },
    ]),
  ],
  controllers: [EmployeeDocumentsController],
  providers: [
    EmployeeDocumentService,
    ValidatorsService,
    EmployeeDocumentResponseHandler,
    AggregateEmployeeDocument,
    EmployeeDocumentRepository,
  ],
})
export class EmployeeDocumentsModule {}
