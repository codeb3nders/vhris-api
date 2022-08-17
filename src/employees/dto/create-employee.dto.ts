import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
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
  PaymentMethodEnum,
  PayTypeEnum,
  RankEnum,
  ReligionEnum,
  UserGroupEnum,
} from 'src/enums/employee.enum';

import { FamilyBackground } from '../interface/employee.interface';

export class CreateEmployeeDto {
  @IsEmpty()
  @ApiProperty()
  employeeNo: string;

  @ApiProperty()
  @IsNotEmpty()
  personalID: string;

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

  @ApiProperty()
  companyContactNumber: string;

  @ApiProperty({ required: true })
  taxExemption: string;

  @ApiProperty({ required: true })
  @IsEmail()
  companyEmail: string;

  @ApiProperty()
  NumberOfDependents: number;

  @ApiProperty()
  sss: string;

  @ApiProperty()
  philHealth: string;

  @ApiProperty()
  pagIbig: string;

  @ApiProperty()
  tin: string;

  @IsOptional()
  @ApiProperty()
  yearsInService: string;

  @IsOptional()
  @ApiProperty()
  basicPay: number;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  payRateType: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PaymentMethodEnum)
  paymentMethod: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  payrollGroup: string;

  @IsOptional()
  @ApiProperty()
  deductionSSS: number;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  deductPhilhealth: number;

  @IsOptional()
  @ApiProperty()
  deductHMDF: number;

  @IsOptional()
  @ApiProperty()
  @IsEnum(PayTypeEnum)
  fixedContributionRate: string;

  @IsOptional()
  @ApiProperty()
  deductWithholdingTax: number;

  @IsOptional()
  @ApiProperty()
  allowanceDetails: string;
}
