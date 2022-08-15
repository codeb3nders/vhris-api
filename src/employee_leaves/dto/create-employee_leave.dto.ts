import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeLeaveDto {
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
