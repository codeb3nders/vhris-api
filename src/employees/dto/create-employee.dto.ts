import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsOptional,
  ValidateNested,
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
import { IsNotEmpty } from 'class-validator';
import { FamilyBackground } from '../interface/employee.interface';

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

  @ApiProperty()
  suffix: string;

  @ApiProperty()
  citizenship: string;

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
  personalContactNumber: string;

  @ApiProperty()
  companyContactNumber: string;

  @ApiProperty({ required: true })
  taxExemption: string;

  @ApiProperty({ required: true })
  @IsEmail()
  companyEmail: string;

  @ApiProperty({ required: true })
  @IsEmail()
  personalEmail: string;

  @ApiProperty()
  payrollBankAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankBranch: string;
  };

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
  presentCity: string;

  @ApiProperty()
  permanentCity: string;

  @ApiProperty()
  presentZipCode: string;

  @ApiProperty()
  permanentZipCode: string;

  @ApiProperty()
  presentRegion: string;

  @ApiProperty()
  permanentRegion: string;

  @ApiProperty()
  permanentResidenceAddress: string;

  @ApiProperty()
  presentResidenceAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(HighestEducationalAttainmentEnum)
  @Transform((param) => param.value.toUpperCase())
  highestEducationalAttainment?: HighestEducationalAttainmentEnum;

  @ApiProperty()
  elementaryYrFrom: number;

  @ApiProperty()
  elementaryYrTo: number;

  @ApiProperty()
  elementarySchoolAndAddress: string;

  @ApiProperty()
  elementaryHonors: string;

  @ApiProperty()
  secondaryYrFrom: number;

  @ApiProperty()
  secondaryYrTo: number;

  @ApiProperty()
  secondarySchoolAndAddress: string;

  @ApiProperty()
  secondaryHonors: string;

  @ApiProperty()
  tertiaryYrFrom: number;

  @ApiProperty()
  tertiaryYrTo: number;

  @ApiProperty()
  tertiarySchoolAndAddress: string;

  @ApiProperty()
  tertiaryDegree: string;

  @ApiProperty()
  tertiaryHonors: string;

  @ApiProperty()
  postGradYrFrom: number;

  @ApiProperty()
  postGradYrTo: number;

  @ApiProperty()
  postGradSchoolAndAddress: string;

  @ApiProperty()
  postGradDegree: string;

  @ApiProperty()
  postGradHonors: string;

  @ApiProperty()
  othersYrFrom: number;

  @ApiProperty()
  othersYrTo: number;

  @ApiProperty()
  othersSchoolAndAddress: string;

  @ApiProperty()
  othersDegree: string;

  @ApiProperty()
  othersHonors: string;

  @ApiProperty()
  licensure: string;

  @ApiProperty({ required: true })
  emergencyContact: {
    name: string;
    address: string;
    phoneNumber: string;
  };

  @ApiProperty()
  employmentRecords: [
    {
      examTitle: string;
      dateTaken: Date;
      Rating: string;
    },
  ];

  @ApiProperty()
  govtProfExamsPassed: [
    {
      examTitle: string;
      dateTaken: Date;
      Rating: string;
    },
  ];

  @ApiProperty()
  licensesCertifications: [
    {
      name: string;
      authorizingEntity: string;
      validUntil: Date;
      licenseCertNo: string;
    },
  ];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => FamilyBackground)
  familyBackground: FamilyBackground[];

  @IsEmpty()
  @ApiProperty()
  password: string;
}
