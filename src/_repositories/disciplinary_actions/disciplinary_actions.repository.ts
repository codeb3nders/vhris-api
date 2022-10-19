import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DisciplinaryActionDocument,
  DisciplinaryAction,
} from 'src/disciplinary_actions/entities/disciplinary_action.entity';
import { AggregateDisciplinaryAction } from 'src/_aggregates/disciplinary_actions.aggregate';
import { EntityRepository } from '../entity.repository';

@Injectable()
export class DisciplinaryActionRepository extends EntityRepository<DisciplinaryActionDocument> {
  constructor(
    @InjectModel(DisciplinaryAction.name)
    DisciplinaryActionModel: Model<DisciplinaryActionDocument>,
    aggregateQry: AggregateDisciplinaryAction,
  ) {
    super(DisciplinaryActionModel, aggregateQry);
  }
}
