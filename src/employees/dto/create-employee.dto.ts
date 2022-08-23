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
  CitizenshipEnum,
  CivilStatusEnum,
  DepartmentsEnum,
  EmployeeEnum,
  EmploymentStatusEnum,
  LocationsEnum,
  PaymentMethodEnum,
  PayTypeEnum,
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

  @ApiProperty({ required: true })
  isActive: boolean;

  @ApiProperty({ required: true })
  @IsEnum(UserGroupEnum)
  @Transform((param) => param.value.toUpperCase())
  userGroup: UserGroupEnum;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  suffix: string;

  @ApiProperty({ required: true })
  birthDate: Date;

  @ApiProperty({ required: true })
  gender: string;

  @ApiProperty({ required: true })
  @IsEnum(CivilStatusEnum)
  @Transform((param) => param.value.toUpperCase())
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  @IsEnum(CitizenshipEnum)
  @Transform((param) => param.value.toUpperCase())
  citizenship: string;

  @ApiProperty()
  @IsEnum(ReligionEnum)
  @Transform((param) => param.value.toUpperCase())
  religion: ReligionEnum;

  @ApiProperty({ required: true })
  personalContactNumber: string;

  @ApiProperty({ required: true })
  @IsEmail()
  personalEmail: string;

  presentAddress: {
    addressLine: string;
    city: string;
    zipCode: string;
    region: string;
    country: string;
  };

  permanentAddress: {
    addressLine: string;
    city: string;
    zipCode: string;
    region: string;
    country: string;
  };

  educationalBackground: [
    {
      level: string;
      yrFrom: number;
      yrTo: number;
      schoolAndAddress: string;
      degree: string;
      honors: string;
    },
  ];

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

  @ApiProperty({ required: true })
  emergencyContact: {
    name: string;
    address: string;
    phoneNumber: string;
  };

  @ApiProperty()
  companyContactNumber: string;

  @ApiProperty({ required: true })
  @IsEmail()
  companyEmail: string;

  @ApiProperty({ required: true })
  @IsEnum(EmployeeEnum)
  @Transform((param) => param.value.toUpperCase())
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  @IsEnum(DepartmentsEnum)
  @Transform((param) => param.value.toUpperCase())
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toUpperCase())
  location: LocationsEnum;

  @ApiProperty()
  reportsTo: string;

  @ApiProperty({ required: true })
  dateHired: Date;

  @ApiProperty()
  endOfProbationary: Date;

  @ApiProperty()
  contractEndDate: Date;

  @ApiProperty({ required: true })
  @IsEnum(RankEnum)
  @Transform((param) => param.value.toUpperCase())
  rank: RankEnum;

  @ApiProperty({ required: true })
  @IsEnum(EmploymentStatusEnum)
  @Transform((param) => param.value.toUpperCase())
  employmentStatus: EmploymentStatusEnum;

  employeeBenefits: string;

  @ApiProperty()
  sss: string;

  @ApiProperty()
  philHealth: string;

  @ApiProperty()
  pagIbig: string;

  @ApiProperty()
  tin: string;

  @ApiProperty()
  NumberOfDependents: number;

  @ApiProperty({ required: true })
  taxExemption: string;

  @IsOptional()
  @ApiProperty()
  basicPay: number;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  payRateType: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PaymentMethodEnum)
  paymentMethod: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  payrollGroup: string;

  @IsOptional()
  @ApiProperty()
  deductionSSS: number;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  deductPhilhealth: number;

  @IsOptional()
  @ApiProperty()
  deductHMDF: number;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  fixedContributionRate: string;

  @IsOptional()
  @ApiProperty()
  deductWithholdingTax: number;

  @IsOptional()
  @ApiProperty()
  allowanceDetails: string;

  @ApiProperty()
  payrollBankAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankBranch: string;
  };

  @IsEmpty()
  @ApiProperty()
  password: string;
}
