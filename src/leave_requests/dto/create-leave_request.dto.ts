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
  dateTimeLeaveFirst: string;

  @ApiProperty()
  dateTimeLeaveLast: string;

  @ApiProperty()
  leaveDays: string;

  @ApiProperty()
  returnToWorkDate: string;

  @ApiProperty()
  fieldLeaveReason: string;

  @ApiProperty()
  immediateSupervisor: string;

  @ApiProperty()
  applicationLeaveStatus: string;

  @ApiProperty()
  disapprovalReason: string;

  @ApiProperty()
  approvedDate: string;

  @ApiProperty()
  disapprovedDate: string;
}
