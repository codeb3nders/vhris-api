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
  offsetOThrs: string;

  @ApiProperty()
  @IsNotEmpty()
  dateFrom: string;

  @ApiProperty()
  @IsNotEmpty()
  dateTo: string;

  @ApiProperty()
  @IsNotEmpty()
  noOfDays: string;

  @ApiProperty()
  @IsNotEmpty()
  dateOfReturnToWork: string;

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
  dateTimeApproved: string;

  @ApiProperty()
  @IsOptional()
  approvedBy: string;
}
