import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AggregateEmployeeDocument } from 'src/_aggregates/employee_documents.aggregate';
import { EntityRepository } from 'src/_repositories/entity.repository';
import {
  EmployeeDocumentDocument,
  EmployeeDocument,
} from '../../employee_documents/entities/employee_document.entity';

@Injectable()
export class EmployeeDocumentRepository extends EntityRepository<EmployeeDocumentDocument> {
  constructor(
    @InjectModel(EmployeeDocument.name)
    assetManagementModel: Model<EmployeeDocumentDocument>,
    aggregateQry: AggregateEmployeeDocument,
  ) {
    super(assetManagementModel, aggregateQry);
  }
}
