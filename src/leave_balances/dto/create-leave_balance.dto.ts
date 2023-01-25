import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveBalanceDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => param.value.map((item) => item.toUpperCase()))
  applicableMonth?: string[];

  @ApiProperty()
  @IsOptional()
  VL?: number;

  @ApiProperty()
  @IsOptional()
  SL?: number;

  @ApiProperty()
  @IsOptional()
  BL?: number;

  @ApiProperty()
  @IsOptional()
  BLTaken?: number;

  @ApiProperty()
  @IsOptional()
  CL?: number;

  @ApiProperty()
  @IsOptional()
  CLTaken?: number;

  @ApiProperty()
  @IsOptional()
  ML?: number;

  @ApiProperty()
  @IsOptional()
  MLTaken?: number;

  @ApiProperty()
  @IsOptional()
  PL?: number;

  @ApiProperty()
  @IsOptional()
  PLTaken?: number;

  @ApiProperty()
  @IsOptional()
  SIL?: number;

  @ApiProperty()
  @IsOptional()
  SILTaken?: number;

  @ApiProperty()
  @IsOptional()
  BRL?: number;

  @ApiProperty()
  @IsOptional()
  BRLTaken?: number;

  @ApiProperty()
  @IsOptional()
  UL?: number;

  @ApiProperty()
  @IsOptional()
  ULTaken?: number;

  @ApiProperty()
  @IsOptional()
  dateUpdated?: Date;

  @ApiProperty()
  @IsOptional()
  employeeDetails?: string;
}
