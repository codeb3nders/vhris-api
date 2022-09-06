import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEmpty, IsOptional, ValidateNested } from 'class-validator';

import {
  CivilStatusEnum,
  DepartmentsEnum,
  EmployeeEnum,
  EmploymentStatusEnum,
  EmploymentTypeEnum,
  LocationsEnum,
  RankEnum,
  ReligionEnum,
  UserGroupEnum,
} from 'src/enums/employee.enum';
import { IsNotEmpty } from 'class-validator';
import {
  Address,
  EducationalBackground,
  EmergencyContact,
  EmploymentRecords,
  FamilyBackground,
  GovtProfExamsPassed,
  LicensesCertifications,
  PayrollBankAccount,
} from '../interface/employee.interface';

export class CreateEmployeeDto {
  @IsEmpty()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  employeeNo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  userGroup: UserGroupEnum;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  suffix: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => new Date(param.value).getTime())
  birthDate: number;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsNotEmpty()
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  citizenship: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  religion: ReligionEnum;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsNotEmpty()
  personalContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsEmail()
  @IsNotEmpty()
  personalEmail: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  @IsOptional()
  presentAddress: Address[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  @IsOptional()
  permanentAddress: Address[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => EducationalBackground)
  @IsOptional()
  educationalBackground: EducationalBackground[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => EmploymentRecords)
  @IsOptional()
  employmentRecords: EmploymentRecords[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => GovtProfExamsPassed)
  @IsOptional()
  govtProfExamsPassed: GovtProfExamsPassed[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => LicensesCertifications)
  @IsOptional()
  licensesCertifications: LicensesCertifications[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => FamilyBackground)
  @IsOptional()
  familyBackground: FamilyBackground[];

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  @Type(() => EmergencyContact)
  @IsOptional()
  emergencyContact: EmergencyContact;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  companyContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.map((item) => item.toLowerCase()))
  location: LocationsEnum;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  reportsTo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => new Date(param.value).getTime())
  dateHired: number;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => new Date(param.value).getTime())
  dateInactive: number;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => new Date(param.value).getTime())
  endOfProbationary: number;

  @ApiProperty()
  @IsOptional()
  @Transform((param) => new Date(param.value).getTime())
  contractEndDate: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  rank: RankEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  employmentStatus: EmploymentStatusEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  employmentType: EmploymentTypeEnum;

  @IsOptional()
  employeeBenefits: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  sss: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  philHealth: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  pagIbig: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  tin: string;

  @ApiProperty()
  @IsOptional()
  numberOfDependents: number;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  taxExemption: string;

  @IsOptional()
  @ApiProperty()
  basicPay: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  payRateType: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  paymentMethod: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  payrollGroup: string;

  @IsOptional()
  @ApiProperty()
  deductionSSS: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  deductPhilhealth: string;

  @IsOptional()
  @ApiProperty()
  deductHMDF: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  fixedContributionRate: string;

  @IsOptional()
  @ApiProperty()
  deductWithholdingTax: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.map((item) => item.toLowerCase()))
  allowanceDetails: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => PayrollBankAccount)
  @IsOptional()
  payrollBankAccount: PayrollBankAccount;

  @IsEmpty()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  password: string;
}
