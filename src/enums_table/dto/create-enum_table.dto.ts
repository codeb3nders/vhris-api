import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateEnumTableDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  type: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  name: string;
}
