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
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  accountName: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  accountNumber: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  bankName: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  bankBranch: string;
}

export class FamilyBackground {
  @IsOptional()
  name: string;
  @IsEnum(RelationEnum)
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  relation: RelationEnum;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  occupation: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  company: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  residence: string;
}

export class EmergencyContact {
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  name: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  relation: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  address: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  contactNumber: string;
}

export class Address {
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  addressLine: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  barangay: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  municipality: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  province: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  region: string;
}

export class EducationalBackground {
  @IsEnum(EducationLevelEnum)
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  level: string;
  // @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  yrFrom: number;
  // @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  yrTo: number;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  schoolAndAddress: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  degree: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  honors: string;
}

export class EmploymentRecords {
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  yrFrom: number;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  yrTo: number;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  companyName: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  positionHeld: string;
}

export class GovtProfExamsPassed {
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  examTitle: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  dateTaken: Date;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  rating: string;
}

export class LicensesCertifications {
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  name: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  authorizingEntity: string;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  validUntil: Date;
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  licenseCertNo: string;
}

export class Location {
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toUpperCase())
  @IsOptional()
  location: LocationsEnum;
}
