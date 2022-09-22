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
import { ErrorResponse } from 'src/helpers/error_response';
import { ValidatorsService } from 'src/validators/validators.service';
import { AssetManagementService } from './asset_management.service';
import { CreateAssetManagementDto } from './dto/create-asset_management.dto';
import { UpdateAssetManagementDto } from './dto/update-asset_management.dto';
import { assetManagementResponseHandler } from './response_handler/asset_management.response';

const toCheck = ['assetType'];

@Controller('asset-management')
export class AssetManagementController {
  constructor(
    private readonly assetManagementService: AssetManagementService,
    private validatorsService: ValidatorsService,
  ) {}

  @Post()
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

  @Get()
  async findAll(@Query() params) {
    const response = await this.assetManagementService.findAll(params);
    if (!response || response.length < 1) {
      throw new HttpException('No Record found!', HttpStatus.OK);
    }
    return assetManagementResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async find(@Query() params: any, @Param('employeeNo') employeeNo: string) {
    const response = await this.assetManagementService.find(employeeNo);
    if (!response || response.length < 1) {
      throw new HttpException('No Record found!', HttpStatus.OK);
    }
    return assetManagementResponseHandler.ok(response);
  }

  @Patch(':id')
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetManagementService.remove(id);
  }
}
