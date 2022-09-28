import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsEmpty()
  timeStamp: number;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsNotEmpty()
  documentType: string;

  @ApiProperty()
  @IsNotEmpty()
  dateUploaded: string;

  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsOptional()
  remarks: string;
}
