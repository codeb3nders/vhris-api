import { PartialType } from '@nestjs/swagger';
import { CreateCompanyAssetDto } from './create-company_asset.dto';

export class UpdateCompanyAssetDto extends PartialType(CreateCompanyAssetDto) {}
