import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDocumentDto } from './create-employee_document.dto';

export class UpdateEmployeeDocumentDto extends PartialType(CreateEmployeeDocumentDto) {}
