import { Injectable } from '@nestjs/common';
import { AssetManagementRepository } from '../_repositories/asset_managements/asset_management.repository';
import { CreateAssetManagementDto } from './dto/create-asset_management.dto';
import { UpdateAssetManagementDto } from './dto/update-asset_management.dto';
import { AssetManagement } from './entities/asset_management.entity';

@Injectable()
export class AssetManagementService {
  constructor(private assetManagementRepository: AssetManagementRepository) {}

  async create(createAssetManagementDto: CreateAssetManagementDto) {
    return await this.assetManagementRepository.create(
      createAssetManagementDto,
    );
  }

  async aggregateFind(_params?: any): Promise<AssetManagement[]> {
    return this.assetManagementRepository.aggregateFind(_params);
  }

  async aggregateFindByEmployeeId(employeeNo: string, _params?: any) {
    return await this.assetManagementRepository.aggregateFindByEmployeeId(
      employeeNo,
      _params,
    );
  }

  async update(id: string, updateAssetManagementDto: UpdateAssetManagementDto) {
    updateAssetManagementDto['lastModifiedDate'] = Date.now();
    try {
      return await this.assetManagementRepository.findOneAndUpdate(
        { id },
        updateAssetManagementDto,
      );
    } catch (error) {
      return `Failed updating record with id ${id}`;
    }
  }

  deleteOne(id: string) {
    return this.assetManagementRepository.deleteOne(id);
  }
}
