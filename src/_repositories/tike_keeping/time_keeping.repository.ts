import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TimeKeepingDocument,
  TimeKeeping,
} from 'src/time_keeping/entities/time_keeping.entity';
import { AggregateTimeKeeping } from 'src/_aggregates/time_keeping.aggregate';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class TimeKeepingRepository extends EntityRepository<TimeKeepingDocument> {
  constructor(
    @InjectModel(TimeKeeping.name)
    TimeKeepingModel: Model<TimeKeepingDocument>,
    aggregateQry: AggregateTimeKeeping,
  ) {
    super(TimeKeepingModel, aggregateQry);
  }
}
