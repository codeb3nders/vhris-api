import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

class Details {
  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  day: string;

  @ApiProperty()
  @IsNotEmpty()
  holidayType: string;

  @ApiProperty()
  @IsNotEmpty()
  shift: string;

  @ApiProperty()
  @IsOptional()
  in1: string;

  @ApiProperty()
  @IsOptional()
  out1: string;

  @ApiProperty()
  @IsOptional()
  in2: string;

  @ApiProperty()
  @IsOptional()
  out2: string;

  @ApiProperty()
  @IsOptional()
  regHours: number;

  @ApiProperty()
  @IsOptional()
  lateMins: number;

  @ApiProperty()
  @IsOptional()
  utMins: number;

  @ApiProperty()
  @IsOptional()
  absentHrs: number;

  @ApiProperty()
  @IsOptional()
  otHrs: number;

  @ApiProperty()
  @IsOptional()
  ndiffHrs: number;

  @ApiProperty()
  @IsOptional()
  ndiffOTHrs: number;

  @ApiProperty()
  @IsOptional()
  remarks: string;

  @ApiProperty()
  @IsOptional()
  verified: string;

  @ApiProperty()
  @IsOptional()
  dateVerified: Date;
}

export class CreateTimeKeepingDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  periodStartDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  periodEndDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  verificationDueDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  employeeName: string;

  @ApiProperty()
  @IsOptional()
  details: Details;
}
