import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateEmployeeHistoryDto {
  @IsNotEmpty()
  @ApiProperty()
  employeeNo: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  details: {};
}
