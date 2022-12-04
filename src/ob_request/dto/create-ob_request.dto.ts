import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { timeFormatChecker } from 'src/_utils/data/time_format_checker.util';
import { ErrorResponse } from 'src/_utils/response_handler/error_response.util';

class ItineraryDetailsDto {
  @ApiProperty()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  to: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => {
    if (timeFormatChecker(param.value)) {
      return param.value;
    } else {
      ErrorResponse.conflict('Invalid Time Of Departure!');
    }
  })
  timeOfDeparture: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((param) => {
    if (timeFormatChecker(param.value)) {
      return param.value;
    } else {
      ErrorResponse.conflict('Invalid Time Of Arrival!');
    }
  })
  timeOfArrival: string;
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
