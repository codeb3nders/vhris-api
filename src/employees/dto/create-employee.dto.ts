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
  AllowanceTypeEnum,
  CivilStatusEnum,
  DepartmentsEnum,
  EducationLevelEnum,
  EmployeeEnum,
  EmploymentStatusEnum,
  EmploymentTypeEnum,
  LocationsEnum,
  RankEnum,
  RelationEnum,
  ReligionEnum,
  UserGroupEnum,
} from 'src/enums/employee.enum';
import { IsNotEmpty } from 'class-validator';

class PayrollBankAccount {
  @IsOptional()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  accountName: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  accountNumber: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  bankName: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  bankBranch: string;
}

class FamilyBackground {
  @IsOptional()
  name: string;
  @IsEnum(RelationEnum)
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  relation: RelationEnum;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  occupation: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  company: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  residence: string;
}

class EmergencyContact {
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  name: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  relation: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  address: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  contactNumber: string;
}

class Address {
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  addressLine: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  barangay: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  municipality: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  province: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  region: string;
}

class EducationalBackground {
  @IsEnum(EducationLevelEnum)
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  level: string;
  // @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  yrFrom: number;
  // @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  yrTo: number;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  schoolAndAddress: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  degree: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  honors: string;
}

class EmploymentRecords {
  @IsOptional()
  yrFrom: number;
  @IsOptional()
  yrTo: number;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  companyName: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  companyAddress: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  positionHeld: string;
}

class GovtProfExamsPassed {
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  examTitle: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  dateTaken: Date;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  rating: string;
}

class LicensesCertifications {
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  name: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  authorizingEntity: string;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  validUntil: Date;
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  licenseCertNo: string;
}

class AllowanceDetails {
  @IsEnum(AllowanceTypeEnum)
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  allowanceType: AllowanceTypeEnum;

  @IsOptional()
  amount: number;
}

export class CreateEmployeeDto {
  @IsEmpty()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  employeeNo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  userGroup: UserGroupEnum;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  suffix: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => new Date(param.value).getTime())
  birthDate: number;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  @IsNotEmpty()
  civilStatus: CivilStatusEnum;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  citizenship: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  religion: ReligionEnum;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  @IsNotEmpty()
  personalContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
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
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  companyContactNumber: string;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  position: EmployeeEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase().trim())
  department: DepartmentsEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform((param) => param.value.map((item) => item.toUpperCase()))
  location: LocationsEnum;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
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
  employeeBenefits: string[];

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  sss: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  philHealth: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  pagIbig: string;

  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  tin: string;

  @ApiProperty()
  @IsOptional()
  numberOfDependents: number;

  @ApiProperty({ required: true })
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  taxExemption: string;

  @IsOptional()
  @ApiProperty()
  basicPay: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  payRateType: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  paymentMethod: string;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  payrollGroup: string;

  @IsOptional()
  @ApiProperty()
  deductionSSS: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  deductPhilhealth: string;

  @IsOptional()
  @ApiProperty()
  deductHMDF: number;

  @IsOptional()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  fixedContributionRate: string;

  @IsOptional()
  @ApiProperty()
  deductWithholdingTax: number;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => AllowanceDetails)
  @IsOptional()
  allowanceDetails: AllowanceDetails;

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

  @ApiProperty({ required: true })
  @IsNotEmpty()
  isRehire: boolean;

  @ApiProperty()
  @IsOptional()
  oldEmployeeNo: string;

  @IsOptional()
  type?: 'string';

  @IsOptional()
  effectiveDate?: Date;

  @IsOptional()
  remarks?: string;

  @IsEmpty()
  @ApiProperty()
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  password: string;
}
