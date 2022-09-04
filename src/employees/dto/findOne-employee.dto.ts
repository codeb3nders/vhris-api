import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindOneEmployeeDto {
  @Optional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  relations: string;
}
