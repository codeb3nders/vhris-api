import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({ required: false })
  fsCode?: string;

  @ApiProperty({ required: false })
  bioCode?: string;

  @ApiProperty({ required: false })
  position?: string;

  @ApiProperty({ required: false })
  rank?: string;

  @ApiProperty({ required: false })
  division?: string;

  @ApiProperty({ required: false })
  department?: string;

  @ApiProperty({ required: false })
  designation?: string;

  @ApiProperty()
  @ApiProperty({ required: false })
  dateHired?: Date;

  @ApiProperty({ required: false })
  yearsInService?: number;

  @ApiProperty({ required: false })
  employmentStatus?: string;

  @ApiProperty({ required: false })
  endOfProbationary?: Date;

  @ApiProperty({ required: false })
  contractEndDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ required: false })
  contactNumber?: string;

  @ApiProperty({ required: false })
  taxExemption?: string;

  @ApiProperty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  backAccountNo?: string;

  @ApiProperty({ required: false })
  civilStatus?: string;

  @ApiProperty()
  NumberOfDependents: number;

  @ApiProperty({ required: false })
  sss?: string;

  @ApiProperty({ required: false })
  philHealth?: string;

  @ApiProperty({ required: false })
  pagIbig?: string;

  @ApiProperty({ required: false })
  tin?: string;

  @ApiProperty({ required: false })
  city: string;

  @ApiProperty({ required: false })
  zipCode: string;

  @ApiProperty({ required: false })
  region: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  course?: string;

  @ApiProperty({ required: false })
  educationalAttainment?: string;

  @ApiProperty({ required: false })
  schoolAttended?: string;

  @ApiProperty({ required: false })
  licensure?: string;

  @ApiProperty({ required: false })
  prcIdNo?: string;

  @ApiProperty({ required: false })
  noticeOffense?: string;

  @ApiProperty({ required: false })
  audit201?: string;

  @ApiProperty({ required: false })
  remarks?: string;

  @ApiProperty({ required: false })
  cocNo?: string;

  @ApiProperty({ required: false })
  vaccineStatus?: string;

  @ApiProperty({ required: false })
  digitalBulletin?: string;

  @ApiProperty({ required: false })
  viberNumber?: string;

  @ApiProperty({ required: false })
  vpdcEmail?: string;

  @ApiProperty({ required: false })
  emergencyContactPerson?: string;

  @ApiProperty({ required: false })
  emergencyAddress?: string;

  @ApiProperty({ required: false })
  emergencyContactNo?: string;
}
