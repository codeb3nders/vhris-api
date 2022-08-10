import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEmpty, IsEnum, IsOptional } from 'class-validator';

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
import { IsNotEmpty } from 'class-validator';

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
  @IsEnum(EmployeeEnum)
  @Transform((param) => param.value.toUpperCase())
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  @IsEnum(RankEnum)
  @Transform((param) => param.value.toUpperCase())
  rank: RankEnum;

  @ApiProperty({ required: true })
  @IsEnum(DepartmentsEnum)
  @Transform((param) => param.value.toUpperCase())
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toUpperCase())
  location: LocationsEnum;

  @ApiProperty({ required: true })
  isActive: boolean;

  @ApiProperty({ required: true })
  @IsEnum(UserGroupEnum)
  @Transform((param) => param.value.toUpperCase())
  userGroup: UserGroupEnum;

  @ApiProperty()
  reportsTo: string;

  @ApiProperty({ required: true })
  dateHired: Date;

  @ApiProperty({ required: true })
  @IsEnum(EmploymentStatusEnum)
  @Transform((param) => param.value.toUpperCase())
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
  @IsEnum(CivilStatusEnum)
  @Transform((param) => param.value.toUpperCase())
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  @IsEnum(ReligionEnum)
  @Transform((param) => param.value.toUpperCase())
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
  @IsEnum(HighestEducationalAttainmentEnum)
  @Transform((param) => param.value.toUpperCase())
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
