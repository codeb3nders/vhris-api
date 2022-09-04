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
  isActive: boolean;

  @ApiProperty({ required: true })
  userGroup: UserGroupEnum;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  firstName: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  lastName: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  middleName: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  suffix: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  birthDate: Date;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  gender: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  citizenship: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  religion: ReligionEnum;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  personalContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsEmail()
  personalEmail: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  presentAddress: Address[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  permanentAddress: Address[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => EducationalBackground)
  educationalBackground: EducationalBackground[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => EmploymentRecords)
  employmentRecords: EmploymentRecords[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => GovtProfExamsPassed)
  govtProfExamsPassed: GovtProfExamsPassed[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => LicensesCertifications)
  licensesCertifications: LicensesCertifications[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => FamilyBackground)
  familyBackground: FamilyBackground[];

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  @Type(() => EmergencyContact)
  emergencyContact: EmergencyContact;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  companyContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  @IsEmail()
  companyEmail: string;

  @ApiProperty({ required: true })
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  location: LocationsEnum;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  reportsTo: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  dateHired: Date;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  dateInactive: Date;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  endOfProbationary: Date;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  contractEndDate: Date;

  @ApiProperty({ required: true })
  rank: RankEnum;

  @ApiProperty({ required: true })
  employmentStatus: EmploymentStatusEnum;

  @ApiProperty({ required: true })
  employmentType: EmploymentTypeEnum;

  employeeBenefits: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  sss: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  philHealth: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  pagIbig: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  tin: string;

  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  NumberOfDependents: number;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toLowerCase())
  taxExemption: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
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
  @Transform((param) => param.value.toLowerCase())
  deductionSSS: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  deductPhilhealth: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  deductHMDF: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  fixedContributionRate: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  deductWithholdingTax: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  allowanceDetails: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => PayrollBankAccount)
  payrollBankAccount: PayrollBankAccount;

  @IsEmpty()
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  password: string;
}
