import { Module } from '@nestjs/common';
import { AssetManagementService } from './asset_management.service';
import { AssetManagementController } from './asset_management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssetManagement,
  AssetManagementSchema,
} from './entities/asset_management.entity';
import { ValidatorsModule } from 'src/_validators/validators.module';
import { ValidatorsService } from 'src/_validators/validators.service';
import { AssetManagementResponseHandler } from 'src/_utils/response_handler/asset_management_handler.response';
import { AggregateAssetManagement } from 'src/_repositories/aggregates/asset_management.aggregate';

@Module({
  imports: [
    ValidatorsModule,
    MongooseModule.forFeature([
      {
        name: AssetManagement.name,
        schema: AssetManagementSchema,
      },
    ]),
  ],
  controllers: [AssetManagementController],
  providers: [
    AssetManagementService,
    ValidatorsService,
    AssetManagementResponseHandler,
    AggregateAssetManagement,
  ],
})
export class AssetManagementModule {}
