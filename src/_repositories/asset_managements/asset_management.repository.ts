import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AggregateAssetManagement } from 'src/_aggregates/asset_management.aggregate';
import { EntityRepository } from 'src/_repositories/entity.repository';

import {
  AssetManagement,
  AssetManagementDocument,
} from '../../asset_management/entities/asset_management.entity';

@Injectable()
export class AssetManagementRepository extends EntityRepository<AssetManagementDocument> {
  constructor(
    @InjectModel(AssetManagement.name)
    assetManagementModel: Model<AssetManagementDocument>,
    aggregateQry: AggregateAssetManagement,
  ) {
    super(assetManagementModel, aggregateQry);
  }
}
