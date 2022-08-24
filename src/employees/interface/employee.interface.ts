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
  deductPhilhealth: number;
  deductHMDF: number;
  fixedContributionRate: string;
  deductWithholdingTax: number;
  allowanceDetails: JSON;
  payrollBankAccount: JSON;
  leave_requests?: any;
}

export class FamilyBackground {
  name: string;
  @IsEnum(RelationEnum)
  @Transform((param) => param.value.toUpperCase())
  relation: RelationEnum;
  occupation: string;
  company: string;
  residence: string;
}

export class EmergencyContact {
  name: string;
  relation: string;
  address: string;
  contactNumber: string;
}

export class Address {
  addressLine: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
}

export class EducationalBackground {
  @IsEnum(EducationLevelEnum)
  @Transform((param) => param.value.toUpperCase())
  level: string;
  yrFrom: number;
  yrTo: number;
  schoolAndAddress: string;
  degree: string;
  honors: string;
}

export class EmploymentRecords {
  examTitle: string;
  dateTaken: Date;
  Rating: string;
}

export class GovtProfExamsPassed {
  examTitle: string;
  dateTaken: Date;
  Rating: string;
}

export class LicensesCertifications {
  name: string;
  authorizingEntity: string;
  validUntil: Date;
  licenseCertNo: string;
}

export class Location {
  @IsEnum(LocationsEnum)
  @Transform((param) => param.value.toUpperCase())
  location: LocationsEnum;
}
