import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { FamilyBackground } from 'src/employees/interface/employee.interface';

export class CreatePersonalInformationDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => FamilyBackground)
  familyBackground: FamilyBackground[];
}
