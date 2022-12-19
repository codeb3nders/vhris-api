import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EnumsTableDocument,
  EnumsTable,
} from 'src/enums_table/entities/enums_table.entity';
import { AggregateEnumsTable } from 'src/_aggregates/enums_table.aggregate';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class EnumsTableRepository extends EntityRepository<EnumsTableDocument> {
  constructor(
    @InjectModel(EnumsTable.name)
    userLogModel: Model<EnumsTableDocument>,
    aggregateQry: AggregateEnumsTable,
  ) {
    super(userLogModel, aggregateQry);
  }
}
