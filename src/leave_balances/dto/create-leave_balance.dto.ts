import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveBalanceDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase().trim())
  leaveType?: string;

  @ApiProperty()
  @IsOptional()
  leaveBalance?: number;

  @ApiProperty()
  @IsOptional()
  leaveTaken?: number;

  @ApiProperty()
  @IsOptional()
  dateUpdated?: Date;

  @ApiProperty()
  @IsOptional()
  employeeDetails?: string;
}
