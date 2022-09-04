import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FindOneEmployeeDto {
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  relations: string[];
}
