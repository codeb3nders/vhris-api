import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserCredentialDocument,
  UserCredential,
} from 'src/user_credentials/entities/user_credential.entity';
import { EntityRepository } from '../entity.repository';

@Injectable()
export class UserCredentialRepository extends EntityRepository<UserCredentialDocument> {
  constructor(
    @InjectModel(UserCredential.name)
    assetManagementModel: Model<UserCredentialDocument>,
  ) {
    super(assetManagementModel);
  }
}
