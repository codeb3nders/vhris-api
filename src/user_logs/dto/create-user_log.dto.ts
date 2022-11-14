import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserLogDto {
  @ApiProperty()
  @IsNotEmpty()
  portal: string;

  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  module: string;

  @ApiProperty()
  @IsNotEmpty()
  event: string;

  @ApiProperty()
  @IsNotEmpty()
  details: string;

  @ApiProperty()
  @IsNotEmpty()
  ip_address: string;

  @ApiProperty()
  @IsNotEmpty()
  user_agent: string;
}
