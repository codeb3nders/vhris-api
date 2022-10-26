import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ErrorResponse } from 'src/_utils/response_handler/error_response.util';
import { ValidatorsService } from 'src/validators/validators.service';
import { AssetManagementService } from './asset_management.service';
import { CreateAssetManagementDto } from './dto/create-asset_management.dto';
import { UpdateAssetManagementDto } from './dto/update-asset_management.dto';
import { AssetManagementResponseHandler } from '../_utils/response_handler/asset_management_handler.response';
import { CreateCompanyAssetDto } from './dto/create-company_asset.dto';

const toCheck = ['assetType'];

@Controller('asset')
export class AssetManagementController {
  constructor(
    private readonly assetManagementService: AssetManagementService,
    private validatorsService: ValidatorsService,
    private assetManagementResponseHandler: AssetManagementResponseHandler,
  ) {}

  @Post('management')
  async create(@Body() createAssetManagementDto: CreateAssetManagementDto) {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createAssetManagementDto,
        toCheck,
      );

      return await this.assetManagementService.create(createAssetManagementDto);
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @Get('management')
  async find(@Query() params) {
    const response = await this.assetManagementService.aggregateFind(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.assetManagementResponseHandler.assetManagement(response);
  }

  @Get('management/:employeeNo')
  async aggregateFindByEmployeeId(
    @Query() params: any,
    @Param('employeeNo') employeeNo: string,
  ) {
    const response =
      await this.assetManagementService.aggregateFindByEmployeeId(employeeNo);
    if (!response || response.length < 1) {
      return response;
    }
    return this.assetManagementResponseHandler.assetManagement(response);
  }

  @Patch('management/:id')
  async update(
    @Param('id') id: string,
    @Body() updateAssetManagementDto: UpdateAssetManagementDto,
  ) {
    await this.validatorsService.validateEmployeesPostRequest(
      updateAssetManagementDto,
      toCheck,
    );

    return await this.assetManagementService.update(
      id,
      updateAssetManagementDto,
    );
  }

  @Delete('management/:id')
  deleteOne(@Param('id') id: string) {
    return this.assetManagementService.deleteOne(id);
  }

  // company asset

  @Post('company')
  async createCompanyAsset(
    @Body() createCompanyAssetDto: CreateCompanyAssetDto,
  ) {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createCompanyAssetDto,
        toCheck,
      );

      return await this.assetManagementService.createCompanyAsset(
        createCompanyAssetDto,
      );
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @Get('company')
  async findCompanyAsset(@Query() params) {
    const response = await this.assetManagementService.getAllCompanyAsset(
      params,
    );
    if (!response) {
      return response;
    }
    return this.assetManagementResponseHandler.companyAsset(response);
  }

  @Get('company/:id')
  async findCompanyAssetById(@Param('id') id: string) {
    const response = await this.assetManagementService.getCompanyAssetById(id);
    if (!response) {
      return response;
    }
    return this.assetManagementResponseHandler.companyAsset(response);
  }
}
