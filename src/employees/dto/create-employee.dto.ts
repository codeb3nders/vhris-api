import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import {
  CivilStatusEnum,
  DepartmentsEnum,
  EmployeeEnum,
  EmploymentStatusEnum,
  HighestEducationalAttainmentEnum,
  LocationsEnum,
  RankEnum,
  ReligionEnum,
  UserGroupEnum,
} from 'src/enums/employee.enum';

export class CreateEmployeeDto {
  @IsEmpty()
  @ApiProperty()
  employeeNo: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty({ required: true })
  @Matches(
    `^${Object.values(EmployeeEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  @Matches(
    `^${Object.values(RankEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  rank: RankEnum;

  @ApiProperty({ required: true })
  @Matches(
    `^${Object.values(DepartmentsEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  @Matches(
    `^${Object.values(LocationsEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  location: LocationsEnum;

  @ApiProperty({ required: true })
  isActive: boolean;

  @ApiProperty({ required: true })
  @Matches(
    `^${Object.values(UserGroupEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  userGroup: UserGroupEnum;

  @ApiProperty()
  reportsTo: string;

  @ApiProperty({ required: true })
  dateHired: Date;

  @ApiProperty({ required: true })
  @Matches(
    `^${Object.values(EmploymentStatusEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  employmentStatus: EmploymentStatusEnum;

  @ApiProperty()
  endOfProbationary: Date;

  @ApiProperty()
  contractEndDate: Date;

  @ApiProperty({ required: true })
  gender: string;

  @ApiProperty({ required: true })
  birthDate: Date;

  @ApiProperty({ required: true })
  contactNumber: string;

  @ApiProperty({ required: true })
  taxExemption: string;

  @ApiProperty({ required: true })
  @IsEmail()
  companyEmail: string;

  @ApiProperty({ required: true })
  @IsEmail()
  personalEmail: string;

  @ApiProperty({ required: true })
  backAccountNo: string;

  @ApiProperty({ required: true })
  @Matches(
    `^${Object.values(CivilStatusEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  @Matches(
    `^${Object.values(ReligionEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  religion: ReligionEnum;

  @ApiProperty()
  NumberOfDependents: number;

  @ApiProperty()
  sss: string;

  @ApiProperty()
  philHealth: string;

  @ApiProperty()
  pagIbig?: string;

  @ApiProperty()
  tin: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  region: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  course?: string;

  @ApiProperty()
  @IsOptional()
  @Matches(
    `^${Object.values(HighestEducationalAttainmentEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  educationalAttainment?: HighestEducationalAttainmentEnum;

  @ApiProperty()
  schoolAttended?: string;

  @ApiProperty()
  licensure: string;

  @ApiProperty()
  prcIdNo: string;

  @ApiProperty()
  audit201: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  cocNo: string;

  @ApiProperty()
  vpdcEmail: string;

  @ApiProperty({ required: true })
  emergencyContactPerson: string;

  @ApiProperty({ required: true })
  emergencyAddress: string;

  @ApiProperty({ required: true })
  emergencyContactNo: string;

  @IsEmpty()
  @ApiProperty()
  password: string;
}
