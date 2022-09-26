import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {
  AllowanceTypeEnum,
  EducationLevelEnum,
  LocationsEnum,
  RelationEnum,
} from 'src/enums/employee.enum';

export interface EmployeeI {
  employeeNo: string;
  isActive: boolean;
  userGroup: string;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  birthDate: Date;
  gender: string;
  civilStatus: string;
  citizenship: string;
  religion: string;
  personalContactNumber: string;
  personalEmail: string;
  presentAddress: JSON;
  permanentAddress: JSON;
  educationalBackground: JSON;
  employmentRecords: JSON;
  govtProfExamsPassed: JSON;
  licensesCertifications: JSON;
  familyBackground: JSON;
  emergencyContact: JSON;
  companyContactNumber: string;
  companyEmail: string;
  position: string;
  department: string;
  location: string;
  reportsTo: string;
  dateHired: Date;
  dateInactive: Date;
  endOfProbationary: Date;
  contractEndDate: Date;
  rank: string;
  employmentStatus: string;
  employmentType: string;
  sss: string;
  philHealth: string;
  pagIbig: string;
  tin: string;
  numberOfDependents: number;
  taxExemption: string;
  basicPay: number;
  payRateType: string;
  paymentMethod: string;
  payrollGroup: string;
  deductionSSS: number;
  deductPhilhealth: string;
  deductHMDF: number;
  fixedContributionRate: string;
  deductWithholdingTax: number;
  allowanceDetails: JSON;
  payrollBankAccount: JSON;
  leave_requests?: any;
}

export class PayrollBankAccount {
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

export class FamilyBackground {
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

export class EmergencyContact {
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

export class Address {
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

export class EducationalBackground {
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

export class EmploymentRecords {
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

export class GovtProfExamsPassed {
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

export class LicensesCertifications {
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

export class AllowanceDetails {
  @IsEnum(AllowanceTypeEnum)
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  allowanceType: AllowanceTypeEnum;

  @IsOptional()
  amount: number;
}

export class Location {
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toUpperCase().trim())
  @IsOptional()
  location: LocationsEnum;
}
