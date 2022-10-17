import { Module } from '@nestjs/common';
import { EmployeeDocumentsService } from './employee_documents.service';
import { EmployeeDocumentsController } from './employee_documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidatorsModule } from 'src/validators/validators.module';
import {
  EmployeeDocument,
  EmployeeDocumentSchema,
} from './entities/employee_document.entity';
import { ValidatorsService } from 'src/validators/validators.service';
import { EmployeeDocumentResponseHandler } from 'src/utils/response_handler/employee_documents_handler.response';
import { AggregateEmployeeDocuments } from 'src/database/aggreates/employee_documents.aggregate';

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
    EmployeeDocumentsService,
    ValidatorsService,
    EmployeeDocumentResponseHandler,
    AggregateEmployeeDocuments,
  ],
})
export class EmployeeDocumentsModule {}
