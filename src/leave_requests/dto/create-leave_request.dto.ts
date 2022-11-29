import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  leaveType: string;

  @ApiProperty()
  @IsOptional()
  offsetOThrs: number;

  @ApiProperty()
  @IsNotEmpty()
  dateFrom: Date;

  @ApiProperty()
  @IsNotEmpty()
  dateTo: Date;

  @ApiProperty()
  @IsNotEmpty()
  noOfDays: number;

  @ApiProperty()
  @IsNotEmpty()
  dateOfReturnToWork: Date;

  @ApiProperty()
  @IsNotEmpty()
  reasonOfLeave: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  approver: string;

  @ApiProperty()
  @IsOptional()
  leaveReasonOfDisapproval: string;

  @ApiProperty()
  @IsOptional()
  dateTimeApproved: Date;

  @ApiProperty()
  @IsOptional()
  approvedBy: string;
}
