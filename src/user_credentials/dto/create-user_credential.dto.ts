import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCredentialDto {
  @ApiProperty()
  employeeNo: string;
  @ApiProperty()
  timeStamp: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  accessGroup: string;
  @ApiProperty()
  isActive: string;
}
