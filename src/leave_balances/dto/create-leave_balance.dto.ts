import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveBalanceDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  leaveType: string;

  @ApiProperty()
  @IsNotEmpty()
  leaveBalance: number;

  @ApiProperty()
  @IsNotEmpty()
  leaveTaken: number;

  @ApiProperty()
  @IsNotEmpty()
  dateUpdated: Date;

  @ApiProperty()
  @IsNotEmpty()
  employeeDetails: string;
}
