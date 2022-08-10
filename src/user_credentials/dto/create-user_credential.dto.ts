import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class CreateUserCredentialDto {
  @ApiProperty({ required: true })
  employeeNo: string;

  @ApiProperty({ default: new Date().getTime() })
  @IsEmpty()
  timeStamp: number;

  @ApiProperty()
  @IsEmpty()
  password?: string;
}
