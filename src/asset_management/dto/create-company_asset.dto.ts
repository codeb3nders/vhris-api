import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyAssetDto {
  @ApiProperty()
  @IsEmpty()
  timestamp: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  assetName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  assetType: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  assetDetails: string;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase().trim())
  assetSerialNumber: string;

  @ApiProperty()
  @IsOptional()
  status: string;
}
