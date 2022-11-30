import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOvertimeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  timeFrom: Date;

  @ApiProperty()
  @IsNotEmpty()
  timeTo: Date;

  @ApiProperty()
  @IsNotEmpty()
  earlyOT: string;

  @ApiProperty()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsNotEmpty()
  lessBreak: string;

  @ApiProperty()
  @IsNotEmpty()
  plus1day: string;

  @ApiProperty()
  @IsNotEmpty()
  approver: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  totalOThrs: number;

  @ApiProperty()
  @IsNotEmpty()
  OTreasonOfDisapproval: Date;

  @ApiProperty()
  @IsOptional()
  dateTimeApproved: Date;

  @ApiProperty()
  @IsOptional()
  approvedBy: string;

  @ApiProperty()
  @IsOptional()
  CLid: string;

  @ApiProperty()
  @IsOptional()
  CLapproved: boolean;

  @ApiProperty()
  @IsOptional()
  employeeDetails: string;

  @ApiProperty()
  @IsOptional()
  approverDetails: string;
}
