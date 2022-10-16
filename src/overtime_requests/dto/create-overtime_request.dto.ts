import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateOvertimeRequestDto {
  @ApiProperty()
  @IsOptional()
  timestamp: number;

  @ApiProperty()
  @IsOptional()
  overtimeRequestNo: string;

  @ApiProperty()
  @IsOptional()
  employeeNo: string;

  @ApiProperty()
  @IsOptional()
  dateTimeFrom: Date;

  @ApiProperty()
  @IsOptional()
  dateTimeTo: Date;

  @ApiProperty()
  @IsOptional()
  isEarlyOt: boolean;

  @ApiProperty()
  @IsOptional()
  reason: string;

  @ApiProperty()
  @IsOptional()
  isLessBreak: boolean;

  @ApiProperty()
  @IsOptional()
  isPlusDay: boolean;

  @ApiProperty()
  @IsOptional()
  otStatus: string;

  @ApiProperty()
  @IsOptional()
  isApprove: boolean;

  @ApiProperty()
  @IsOptional()
  disapprovalReason: string;
}
