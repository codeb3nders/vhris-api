import { Injectable } from '@nestjs/common';
import { CompanyAssetRepository } from 'src/_repositories/asset_managements/company_asset.repository';
import { AssetManagementRepository } from '../_repositories/asset_managements/asset_management.repository';
import { CreateAssetManagementDto } from './dto/create-asset_management.dto';
import { CreateCompanyAssetDto } from './dto/create-company_asset.dto';
import { UpdateAssetManagementDto } from './dto/update-asset_management.dto';
import { UpdateCompanyAssetDto } from './dto/update-company_asset.dto';
import { AssetManagement } from './entities/asset_management.entity';
import { CompanyAsset } from './entities/company_asset.entity';

@Injectable()
export class AssetManagementService {
  constructor(
    private assetManagementRepository: AssetManagementRepository,
    private companyAssetRepository: CompanyAssetRepository,
  ) {}

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
    return this.assetManagementRepository.deleteOne({ _id: id });
  }

  // company Asset

  async createCompanyAsset(createCompanyAssetDto: CreateCompanyAssetDto) {
    return await this.companyAssetRepository.create(createCompanyAssetDto);
  }

  async getAllCompanyAsset(_params?: any): Promise<CompanyAsset[]> {
    return await this.companyAssetRepository.aggregateFind(_params);
  }

  async getCompanyAssetById(id: string) {
    return await this.companyAssetRepository.aggregateFindOne({
      _id: `ObjectId(${id})`,
    });
  }

  async updateCompanyAsset(
    id: string,
    updateCompanyAssetDto: UpdateCompanyAssetDto,
  ) {
    updateCompanyAssetDto['lastModifiedDate'] = Date.now();
    try {
      return await this.companyAssetRepository.findOneAndUpdate(
        { id },
        updateCompanyAssetDto,
      );
    } catch (error) {
      return `Failed updating record with id ${id}`;
    }
  }

  companyAssetDeleteOne(id: string) {
    return this.companyAssetRepository.deleteOne({ id });
  }
}
