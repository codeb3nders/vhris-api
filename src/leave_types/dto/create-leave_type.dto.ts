import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLeaveTypeDto {
  @ApiProperty({ example: Date.now() })
  @IsNotEmpty()
  typeId: string;

  @ApiProperty({ example: 'SL' })
  @IsNotEmpty()
  typeCode: string;

  @ApiProperty({ example: 'Sick leave' })
  @IsNotEmpty()
  typeName: string;
}
