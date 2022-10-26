import { PartialType } from '@nestjs/swagger';
import { CreateAssetManagementDto } from './create-asset_management.dto';

export class UpdateAssetManagementDto extends PartialType(
  CreateAssetManagementDto,
) {}
