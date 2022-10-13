import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDisciplinaryActionDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsEmpty()
  timestamp: number;

  @ApiProperty()
  @IsEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  caseNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  violationCategory: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  violations: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  offenseStage: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  offenseLevel: string;

  @ApiProperty()
  @IsNotEmpty()
  misconductReportIssueDate: Date;

  @ApiProperty()
  @IsOptional()
  noticeToExplainIssueDate: Date;

  @ApiProperty()
  @IsOptional()
  explanationDate: Date;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase().trim())
  finalDisposition: string;

  @ApiProperty()
  @IsOptional()
  dispositionDate: Date;

  @ApiProperty()
  @IsOptional()
  isAcknowledged: boolean;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase().trim())
  dateAcknowledged: Date;

  @ApiProperty()
  @IsOptional()
  cleansingPeriod: number;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase().trim())
  status: string;
}
