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
  providers: [EmployeeDocumentsService, ValidatorsService],
})
export class EmployeeDocumentsModule {}
