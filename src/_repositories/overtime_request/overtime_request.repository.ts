import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OvertimeRequestDocument,
  OvertimeRequest,
} from 'src/overtime_requests/entities/overtime_request.entity';
import { AggregateOvertimeRequest } from 'src/_aggregates/overtime_request.aggregate';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class OvertimeRequestRepository extends EntityRepository<OvertimeRequestDocument> {
  constructor(
    @InjectModel(OvertimeRequest.name)
    overtimeRequestModel: Model<OvertimeRequestDocument>,
    aggregateQry: AggregateOvertimeRequest,
  ) {
    super(overtimeRequestModel, aggregateQry);
  }
}
