import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaveRequestDto {
  @ApiProperty()
  leaveRequestNo: string;

  @ApiProperty()
  employeeNo: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  leaveApplied: string;

  @ApiProperty()
  otHoursOffset: string;

  @ApiProperty()
  dateToOffsetFrom: string;

  @ApiProperty()
  dateToOffsetTo: string;

  @ApiProperty()
  dateTimeLeaveFirst: string;

  @ApiProperty()
  dateTimeLeaveLast: string;

  @ApiProperty()
  leaveDays: string;

  @ApiProperty()
  returnDate: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  itineraryFrom: string;

  @ApiProperty()
  itineraryTo: string;

  @ApiProperty()
  purpose: string;

  @ApiProperty()
  dateTimeDeparture: string;

  @ApiProperty()
  dateTimeArrival: string;

  @ApiProperty()
  information: string;

  @ApiProperty()
  immediateSupervisor: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  disapprovalReason: string;

  @ApiProperty()
  approvedDate: string;

  @ApiProperty()
  disapprovedDate: string;
}
