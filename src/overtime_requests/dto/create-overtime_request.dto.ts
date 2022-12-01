import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ErrorResponse } from 'src/_utils/response_handler/error_response.util';

export class CreateOvertimeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => {
    const re = new RegExp('^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$');
    if (re.test(param.value)) {
      return param.value;
    } else {
      ErrorResponse.conflict('Invalid time from');
    }
  })
  timeFrom: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => {
    const re = new RegExp('^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$');
    if (re.test(param.value)) {
      return param.value;
    } else {
      ErrorResponse.conflict('Invalid time to');
    }
  })
  timeTo: string;

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
  OTreasonOfDisapproval: string;

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
