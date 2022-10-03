import { ApiProperty } from '@nestjs/swagger';

export class CreateOvertimeRequestDto {
  @ApiProperty()
  timestamp: string;
  @ApiProperty()
  employeeNo: string;
  @ApiProperty()
  dateTimeFrom: string;
  @ApiProperty()
  dateTimeTo: string;
  @ApiProperty()
  isEarlyOt: string;
  @ApiProperty()
  reason: string;
  @ApiProperty()
  isLessBreak: string;
  @ApiProperty()
  isPlusDay: string;
  @ApiProperty()
  otStatus: string;
  @ApiProperty()
  isApprove: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  disapprovalReason: string;
}
