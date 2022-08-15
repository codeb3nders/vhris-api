import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { RelationEnum } from 'src/enums/employee.enum';

interface EmployeeI {
  employeeNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  citizenship: string;
  position: string;
  rank: string;
  department: string;
  location: string;
  isActive: boolean;
  userGroup: string;
  reportsTo: string;
  dateHired: Date;
  employmentStatus: string;
  endOfProbationary: Date;
  contractEndDate: Date;
  gender: string;
  birthDate: Date;
  age: number;
  personalContactNumber: string;
  companyContactNumber: string;
  taxExemption: string;
  companyEmail: string;
  personalEmail: string;
  payrollBankAccount: JSON;
  civilStatus: string;
  religion: string;
  NumberOfDependents: number;
  sss: string;
  philHealth: string;
  pagIbig: string;
  tin: string;
  presentCity: string;
  permanentCity: string;
  presentZipCode: string;
  permanentZipCode: string;
  presentRegion: string;
  permanentRegion: string;
  permanentResidenceAddress: string;
  presentResidenceAddress: string;
  highestEducationalAttainment: string;
  elementaryYrFrom: number;
  elementaryYrTo: number;
  elementarySchoolAndAddress: string;
  elementaryHonors: string;
  secondaryYrFrom: number;
  secondaryYrTo: number;
  secondarySchoolAndAddress: string;
  secondaryHonors: string;
  tertiaryYrFrom: number;
  tertiaryYrTo: number;
  tertiarySchoolAndAddress: string;
  tertiaryDegree: string;
  tertiaryHonors: string;
  postGradYrFrom: number;
  postGradYrTo: number;
  postGradSchoolAndAddress: string;
  postGradDegree: string;
  postGradHonors: string;
  othersYrFrom: number;
  othersYrTo: number;
  othersSchoolAndAddress: string;
  othersDegree: string;
  othersHonors: string;
  licensure: string;
  emergencyContact: JSON;
  employmentRecords: JSON;
  govtProfExamsPassed: JSON;
  licensesCertifications: JSON;
  familyBackground: JSON;
  leave_requests?: any;
}

class FamilyBackground {
  name: string;
  @IsEnum(RelationEnum)
  @Transform((param) => param.value.toUpperCase())
  relation: RelationEnum;
  occupation: string;
  company: string;
  residence: string;
}

export { EmployeeI, FamilyBackground };
