import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserCodeDocument,
  UserCode,
} from 'src/user_credentials/entities/user_code.entity';
import { EntityRepository } from '../entity.repository';

@Injectable()
export class UserCodeRepository extends EntityRepository<UserCodeDocument> {
  constructor(
    @InjectModel(UserCode.name)
    userCodeModel: Model<UserCodeDocument>,
  ) {
    super(userCodeModel);
  }
}
