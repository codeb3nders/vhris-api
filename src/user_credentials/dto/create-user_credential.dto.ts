import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserCredentialDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsEmpty()
  timeStamp: number;

  @ApiProperty()
  @IsEmpty()
  accessGroup: string;

  @ApiProperty()
  @IsEmpty()
  isActive: boolean;

  @ApiProperty()
  @IsEmpty()
  email?: string;

  @ApiProperty()
  @IsEmpty()
  password?: string;
}
