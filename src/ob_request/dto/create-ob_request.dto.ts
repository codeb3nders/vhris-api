import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { timeFormatChecker } from 'src/_utils/data/time_format_checker.util';
import { ErrorResponse } from 'src/_utils/response_handler/error_response.util';

class ItineraryDetailsDto {
  @ApiProperty()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  to: string;

  @ApiProperty()
  @IsNotEmpty()
  departureDateTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  arrivalDateTime: Date;
}

export class CreateOBRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  dateFrom: Date;

  @ApiProperty()
  @IsNotEmpty()
  dateTo: Date;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItineraryDetailsDto)
  @IsOptional()
  itineraryDetails: ItineraryDetailsDto[];

  @ApiProperty()
  @IsOptional()
  isWorkFromHome: boolean;

  @ApiProperty()
  @IsNotEmpty()
  purpose: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  approver: string;

  @ApiProperty()
  @IsOptional()
  OBreasonOfDisapproval: string;

  @ApiProperty()
  @IsOptional()
  dateTimeApproved: string;

  @ApiProperty()
  @IsOptional()
  approvedBy: string;

  @ApiProperty()
  @IsOptional()
  approverComments: string;
}
