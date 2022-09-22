import { Module } from '@nestjs/common';
import { AssetManagementService } from './asset_management.service';
import { AssetManagementController } from './asset_management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssetManagement,
  AssetManagementSchema,
} from './entities/asset_management.entity';
import { ValidatorsModule } from 'src/validators/validators.module';
import { ValidatorsService } from 'src/validators/validators.service';

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
  providers: [AssetManagementService, ValidatorsService],
})
export class AssetManagementModule {}
