import { ApiProperty } from '@nestjs/swagger';

export class createEmployeeLeaveDto {
  @ApiProperty()
  employeeNo: string;
  @ApiProperty()
  leave: string;
  @ApiProperty()
  allowance: string;
  @ApiProperty()
  accrued_balance: string;
  @ApiProperty()
  used: string;
}
