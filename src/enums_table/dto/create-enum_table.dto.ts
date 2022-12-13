import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEnumTableDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  type: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: boolean;
}
