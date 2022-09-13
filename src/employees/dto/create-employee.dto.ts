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
  @Transform((param) => param.value.toUpperCase())
  employeeNo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  userGroup: UserGroupEnum;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  suffix: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => new Date(param.value).getTime())
  birthDate: number;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
  @IsNotEmpty()
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  citizenship: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  religion: ReligionEnum;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
  @IsNotEmpty()
  personalContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
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
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  companyContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.map((item) => item.toUpperCase()))
  location: LocationsEnum;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
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
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  sss: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  philHealth: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  pagIbig: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  tin: string;

  @ApiProperty()
  @IsOptional()
  numberOfDependents: number;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  taxExemption: string;

  @IsOptional()
  @ApiProperty()
  basicPay: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  payRateType: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  paymentMethod: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  payrollGroup: string;

  @IsOptional()
  @ApiProperty()
  deductionSSS: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  deductPhilhealth: string;

  @IsOptional()
  @ApiProperty()
  deductHMDF: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  fixedContributionRate: string;

  @IsOptional()
  @ApiProperty()
  deductWithholdingTax: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.map((item) => item.toUpperCase()))
  allowanceDetails: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => PayrollBankAccount)
  @IsOptional()
  payrollBankAccount: PayrollBankAccount;

  @ApiProperty()
  @IsOptional()
  employmentLastUpdate: Date;

  @ApiProperty()
  @IsOptional()
  jobLastUpdate: Date;

  @IsOptional()
  type?: 'string';

  @IsEmpty()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  password: string;
}
