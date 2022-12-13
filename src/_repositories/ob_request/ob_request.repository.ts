import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OBRequestDocument,
  OBRequest,
} from 'src/ob_request/entities/ob_request.entity';
import { AggregateOBRequest } from 'src/_aggregates/ob_request.aggregate';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class OBRequestRepository extends EntityRepository<OBRequestDocument> {
  constructor(
    @InjectModel(OBRequest.name)
    oBRequestModel: Model<OBRequestDocument>,
    aggregateQry: AggregateOBRequest,
  ) {
    super(oBRequestModel, aggregateQry);
  }
}
