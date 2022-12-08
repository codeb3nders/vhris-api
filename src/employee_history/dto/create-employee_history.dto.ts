import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeHistoryDto {
  @IsNotEmpty()
  @ApiProperty()
  employeeNo: string;

  @IsNotEmpty()
  @ApiProperty()
  effectiveDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  details: any;
}
