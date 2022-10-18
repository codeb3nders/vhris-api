import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AggregateEmployeeDocuments } from 'src/_repositories/aggregates/employee_documents.aggregate';
import { EntityRepository } from 'src/_repositories/entity.repository';
import {
  EmployeeDocument,
  EmployeeDocumentsDocument,
} from './entities/employee_document.entity';

@Injectable()
export class EmployeeDocumentsService extends EntityRepository<EmployeeDocumentsDocument> {
  constructor(
    @InjectModel(EmployeeDocument.name)
    assetManagementModel: Model<EmployeeDocumentsDocument>,
    aggregateQry: AggregateEmployeeDocuments,
  ) {
    super(assetManagementModel, aggregateQry);
  }
}
