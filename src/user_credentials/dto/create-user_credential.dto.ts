import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateUserCredentialDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsEmpty()
  timestamp: number;

  @ApiProperty()
  @IsOptional()
  accessGroup: string;

  @ApiProperty()
  @IsOptional()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  password?: string;
}
