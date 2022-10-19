import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EnumsTable,
  EnumsTableDocument,
} from 'src/enum_tables/entities/enum_table.entity';
import { EntityRepository } from '../entity.repository';

@Injectable()
export class EnumsTableRepository extends EntityRepository<EnumsTableDocument> {
  constructor(
    @InjectModel(EnumsTable.name)
    EnumsTableModel: Model<EnumsTableDocument>,
  ) {
    super(EnumsTableModel);
  }
}
