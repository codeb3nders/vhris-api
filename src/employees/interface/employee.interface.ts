import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {
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
  NumberOfDependents: number;
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
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  accountName: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  accountNumber: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  bankName: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  bankBranch: string;
}

export class FamilyBackground {
  @IsOptional()
  name: string;
  @IsEnum(RelationEnum)
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  relation: RelationEnum;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  occupation: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  company: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  residence: string;
}

export class EmergencyContact {
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  name: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  relation: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  address: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  contactNumber: string;
}

export class Address {
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  addressLine: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  barangay: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  municipality: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  province: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  region: string;
}

export class EducationalBackground {
  @IsEnum(EducationLevelEnum)
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  level: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  yrFrom: number;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  yrTo: number;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  schoolAndAddress: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  degree: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  honors: string;
}

export class EmploymentRecords {
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  yrFrom: number;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  yrTo: number;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  companyName: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  positionHeld: string;
}

export class GovtProfExamsPassed {
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  examTitle: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  dateTaken: Date;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  rating: string;
}

export class LicensesCertifications {
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  name: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  authorizingEntity: string;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  validUntil: Date;
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  licenseCertNo: string;
}

export class Location {
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toLowerCase())
  @IsOptional()
  location: LocationsEnum;
}
