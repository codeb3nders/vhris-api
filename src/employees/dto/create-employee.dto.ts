import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEmpty, IsEnum, IsOptional, ValidateNested } from 'class-validator';

import {
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
import {
  Address,
  EducationalBackground,
  EmergencyContact,
  EmploymentRecords,
  FamilyBackground,
  GovtProfExamsPassed,
  LicensesCertifications,
} from '../interface/employee.interface';

export class CreateEmployeeDto {
  @IsEmpty()
  @ApiProperty()
  employeeNo: string;

  @ApiProperty({ required: true })
  isActive: boolean;

  @ApiProperty({ required: true })
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
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  citizenship: string;

  @ApiProperty()
  religion: ReligionEnum;

  @ApiProperty({ required: true })
  personalContactNumber: string;

  @ApiProperty({ required: true })
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
  companyContactNumber: string;

  @ApiProperty({ required: true })
  @IsEmail()
  companyEmail: string;

  @ApiProperty({ required: true })
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  location: LocationsEnum;

  @ApiProperty()
  reportsTo: string;

  @ApiProperty({ required: true })
  dateHired: Date;

  @ApiProperty()
  dateInactive: Date;

  @ApiProperty()
  endOfProbationary: Date;

  @ApiProperty()
  contractEndDate: Date;

  @ApiProperty({ required: true })
  rank: RankEnum;

  @ApiProperty({ required: true })
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

  @ApiProperty({ required: true, default: 0 })
  basicPay: number;

  @ApiProperty({ required: true, default: 'Bi monthly' })
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  payRateType: string;

  @ApiProperty({ required: true, default: 'Payroll Account' })
  @IsEnum(PaymentMethodEnum)
  @Transform((param) => param.value.toUpperCase())
  paymentMethod: string;

  @ApiProperty({ required: true, default: 'Bi monthly' })
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  payrollGroup: string;

  @ApiProperty({ required: true, default: 0 })
  deductionSSS: number;

  @ApiProperty({ required: true, default: 'Bi monthly' })
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  deductPhilhealth: string;

  @ApiProperty({ required: true, default: 0 })
  deductHMDF: number;

  @ApiProperty({ required: true, default: 'Bi monthly' })
  @IsEnum(PayTypeEnum)
  @Transform((param) => param.value.toUpperCase())
  fixedContributionRate: string;

  @ApiProperty({ required: true, default: 0 })
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
