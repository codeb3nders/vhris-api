import { Injectable } from '@nestjs/common';
import { EmployeeDocumentRepository } from '../_repositories/employee_documents/asset_management.repository';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';
import { EmployeeDocument } from './entities/employee_document.entity';

@Injectable()
export class EmployeeDocumentService {
  constructor(private employeeDocumentRepository: EmployeeDocumentRepository) {}

  async create(createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    return await this.employeeDocumentRepository.create(
      createEmployeeDocumentDto,
    );
  }

  async aggregateFind(_params?: any): Promise<EmployeeDocument[]> {
    return this.employeeDocumentRepository.aggregateFind(_params);
  }

  async aggregateFindByEmployeeId(employeeNo: string, _params?: any) {
    return await this.employeeDocumentRepository.aggregateFindByEmployeeId(
      employeeNo,
      _params,
    );
  }

  async update(
    id: string,
    updateEmployeeDocumentDto: UpdateEmployeeDocumentDto,
  ) {
    updateEmployeeDocumentDto['lastModifiedDate'] = Date.now();

    return await this.employeeDocumentRepository.findOneAndUpdate(
      { id },
      updateEmployeeDocumentDto,
    );
  }

  deleteOne(id: string) {
    return this.employeeDocumentRepository.deleteOne({ _id: id });
  }
}
