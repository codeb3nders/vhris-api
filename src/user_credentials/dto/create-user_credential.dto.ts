import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCredentialDto {
  @ApiProperty()
  employeeNo: string;
  @ApiProperty()
  timeStamp: number;

  @ApiProperty()
  password: string;
  @ApiProperty()
  accessGroup: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  email?: string;
}
