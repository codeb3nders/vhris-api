import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LearningDevelopmentDocument,
  LearningDevelopment,
} from 'src/learning_development/entities/learning_development.entity';
import { EntityRepository } from '../entity.repository';

@Injectable()
export class LearningDevelopmentRepository extends EntityRepository<LearningDevelopmentDocument> {
  constructor(
    @InjectModel(LearningDevelopment.name)
    assetManagementModel: Model<LearningDevelopmentDocument>,
  ) {
    super(assetManagementModel);
  }
}
