import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { timeFormatChecker } from 'src/_utils/data/time_format_checker.util';
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
    if (timeFormatChecker(param.value)) {
      return param.value;
    } else {
      ErrorResponse.conflict('Invalid Time From!');
    }
  })
  timeFrom: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => {
    if (timeFormatChecker(param.value)) {
      return param.value;
    } else {
      ErrorResponse.conflict('Invalid Time To!');
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
  @IsOptional()
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
}
