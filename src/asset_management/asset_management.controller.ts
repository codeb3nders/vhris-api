import { isNil } from 'lodash';
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
import { UpdateCompanyAssetDto } from './dto/update-company_asset.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { skip } from 'rxjs';

const toCheck = ['assetType'];

@Controller('asset')
export class AssetManagementController {
  constructor(
    private readonly assetManagementService: AssetManagementService,
    private readonly employeeService: EmployeesService,
    private validatorsService: ValidatorsService,
    private assetManagementResponseHandler: AssetManagementResponseHandler,
  ) {}

  @Post('management')
  async create(@Body() createAssetManagementsDto: CreateAssetManagementDto[]) {
    const fail = [];
    const success = [];
    for (const createAssetManagementDto of createAssetManagementsDto) {
      let loopError = 0;

      await this.validatorsService.validateEmployeesPostRequest(
        createAssetManagementDto,
        toCheck,
      );

      if (isNil(createAssetManagementDto.employeeNo)) {
        fail.push({
          errorMessage: 'Required EmployeeNo!',
          details: createAssetManagementDto,
        });
        loopError++;
        continue;
      }

      const employee = await this.employeeService.findOne(
        createAssetManagementDto.employeeNo,
      );

      if (isNil(employee)) {
        fail.push({
          errorMessage: 'Employee not found!',
          details: createAssetManagementDto,
        });
        loopError++;
        continue;
      }

      const asset = await this.assetManagementService.getCompanyAssetById(
        createAssetManagementDto.companyAssetId,
      );

      if (isNil(asset)) {
        fail.push({
          errorMessage: 'Asset not available!',
          details: createAssetManagementDto,
        });
        loopError++;
        continue;
      }

      console.log('loop error', loopError);

      if (loopError == 0) {
        const response = await this.assetManagementService.create(
          createAssetManagementDto,
        );

        success.push(response);
      }
    }

    return { success, fail };
    const createAssetManagementDto = createAssetManagementsDto[0];

    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createAssetManagementDto,
        toCheck,
      );

      if (isNil(createAssetManagementDto.employeeNo))
        ErrorResponse.badRequest('Required EmployeeNo!');

      const employee = await this.employeeService.findOne(
        createAssetManagementDto.employeeNo,
      );

      if (isNil(employee)) ErrorResponse.badRequest('Employee not found!');

      const asset = await this.assetManagementService.getCompanyAssetById(
        createAssetManagementDto.companyAssetId,
      );

      if (isNil(asset)) {
        ErrorResponse.badRequest('Asset not available!');
      }

      // return await this.assetManagementService.create(createAssetManagementDto);
    } catch (error) {
      ErrorResponse.badRequest(error.response || error);
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

    if (!response || response.length < 1) {
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

  @Patch('company/:id')
  async updateCompanyAsset(
    @Param('id') id: string,
    @Body() updateCompanyAssetDto: UpdateCompanyAssetDto,
  ) {
    await this.validatorsService.validateEmployeesPostRequest(
      updateCompanyAssetDto,
      toCheck,
    );

    return await this.assetManagementService.updateCompanyAsset(
      id,
      updateCompanyAssetDto,
    );
  }

  @Delete('company/:id')
  companyAssetDeleteOne(@Param('id') id: string) {
    return this.assetManagementService.companyAssetDeleteOne(id);
  }
}
