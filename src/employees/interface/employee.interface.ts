import { Transform } from 'class-transformer';
import { IsArray, IsEnum } from 'class-validator';
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
  @Transform((param) => param.value.toLowerCase())
  accountName: string;
  @Transform((param) => param.value.toLowerCase())
  accountNumber: string;
  @Transform((param) => param.value.toLowerCase())
  bankName: string;
  @Transform((param) => param.value.toLowerCase())
  bankBranch: string;
}

export class FamilyBackground {
  name: string;
  @IsEnum(RelationEnum)
  @Transform((param) => param.value.toLowerCase())
  relation: RelationEnum;
  @Transform((param) => param.value.toLowerCase())
  occupation: string;
  @Transform((param) => param.value.toLowerCase())
  company: string;
  @Transform((param) => param.value.toLowerCase())
  residence: string;
}

export class EmergencyContact {
  @Transform((param) => param.value.toLowerCase())
  name: string;
  @Transform((param) => param.value.toLowerCase())
  relation: string;
  @Transform((param) => param.value.toLowerCase())
  address: string;
  @Transform((param) => param.value.toLowerCase())
  contactNumber: string;
}

export class Address {
  @Transform((param) => param.value.toLowerCase())
  addressLine: string;
  @Transform((param) => param.value.toLowerCase())
  barangay: string;
  @Transform((param) => param.value.toLowerCase())
  municipality: string;
  @Transform((param) => param.value.toLowerCase())
  province: string;
  @Transform((param) => param.value.toLowerCase())
  region: string;
}

export class EducationalBackground {
  @IsEnum(EducationLevelEnum)
  @Transform((param) => param.value.toLowerCase())
  level: string;
  @Transform((param) => param.value.toLowerCase())
  yrFrom: number;
  @Transform((param) => param.value.toLowerCase())
  yrTo: number;
  @Transform((param) => param.value.toLowerCase())
  schoolAndAddress: string;
  @Transform((param) => param.value.toLowerCase())
  degree: string;
  @Transform((param) => param.value.toLowerCase())
  honors: string;
}

export class EmploymentRecords {
  @Transform((param) => param.value.toLowerCase())
  yrFrom: number;
  @Transform((param) => param.value.toLowerCase())
  yrTo: number;
  @Transform((param) => param.value.toLowerCase())
  companyName: string;
  @Transform((param) => param.value.toLowerCase())
  positionHeld: string;
}

export class GovtProfExamsPassed {
  @Transform((param) => param.value.toLowerCase())
  examTitle: string;
  @Transform((param) => param.value.toLowerCase())
  dateTaken: Date;
  @Transform((param) => param.value.toLowerCase())
  rating: string;
}

export class LicensesCertifications {
  @Transform((param) => param.value.toLowerCase())
  name: string;
  @Transform((param) => param.value.toLowerCase())
  authorizingEntity: string;
  @Transform((param) => param.value.toLowerCase())
  validUntil: Date;
  @Transform((param) => param.value.toLowerCase())
  licenseCertNo: string;
}

export class Location {
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toLowerCase())
  location: LocationsEnum;
}
