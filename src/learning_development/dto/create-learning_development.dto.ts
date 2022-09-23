import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLearningDevelopmentDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsEmpty()
  timestamp: number;

  @ApiProperty()
  @IsNotEmpty()
  isAttended: boolean;

  @ApiProperty()
  @IsNotEmpty()
  courseTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  institution: string;

  @ApiProperty()
  @IsNotEmpty()
  venue: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsOptional()
  bondLength: number;

  @ApiProperty()
  @IsOptional()
  bondStartDate: Date;

  @ApiProperty()
  @IsOptional()
  bondEndDate: Date;
}
