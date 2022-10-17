import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AggregateAssetManagement } from 'src/database/aggreates/asset_management.aggregate';
import { EntityRepository } from 'src/database/entity_repository';

import {
  AssetManagement,
  AssetManagementDocument,
} from './entities/asset_management.entity';

@Injectable()
export class AssetManagementService extends EntityRepository<AssetManagementDocument> {
  constructor(
    @InjectModel(AssetManagement.name)
    assetManagementModel: Model<AssetManagementDocument>,
    aggregateQry: AggregateAssetManagement,
  ) {
    super(assetManagementModel, aggregateQry);
  }
}
