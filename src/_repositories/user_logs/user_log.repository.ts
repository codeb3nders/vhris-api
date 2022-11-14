import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserLog,
  UserLogDocument,
} from 'src/user_logs/entities/user_log.entity';
import { AggregateUserLog } from 'src/_aggregates/user_log.aggregate';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class UserLogRepository extends EntityRepository<UserLogDocument> {
  constructor(
    @InjectModel(UserLog.name)
    userLogModel: Model<UserLogDocument>,
    aggregateQry: AggregateUserLog,
  ) {
    super(userLogModel, aggregateQry);
  }
}
