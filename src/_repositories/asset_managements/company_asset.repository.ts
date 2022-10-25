import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CompanyAssetDocument,
  CompanyAsset,
} from 'src/asset_management/entities/company_asset.entity';
import { AggregateCompanyAsset } from 'src/_aggregates/company_asset.aggregate';
import { EntityRepository } from 'src/_repositories/entity.repository';

@Injectable()
export class CompanyAssetRepository extends EntityRepository<CompanyAssetDocument> {
  constructor(
    @InjectModel(CompanyAsset.name)
    assetManagementModel: Model<CompanyAssetDocument>,
    aggregateQry: AggregateCompanyAsset,
  ) {
    super(assetManagementModel, aggregateQry);
  }
}
