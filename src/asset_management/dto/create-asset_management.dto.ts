import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAssetManagementDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsEmpty()
  timestamp: number;

  @ApiProperty()
  @IsNotEmpty()
  companyAssetId: string;

  @ApiProperty()
  @IsOptional()
  conditionAssigned: string;

  @ApiProperty()
  @IsOptional()
  conditionReturned: string;

  @ApiProperty()
  @IsOptional()
  dateAssigned: Date;

  @ApiProperty()
  @IsOptional()
  dateReturned: Date;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase().trim())
  remarks: string;
}
