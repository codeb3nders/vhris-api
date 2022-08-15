import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true })
  employeeNo: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName: string;

  @Prop()
  suffix: string;

  @Prop({ required: true })
  citizenship: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  rank: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  userGroup: string;

  @Prop()
  reportsTo: string;

  @Prop({ required: true })
  dateHired: Date;

  @Prop({ required: true })
  employmentStatus: string;

  @Prop()
  endOfProbationary: Date;

  @Prop()
  contractEndDate: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  personalContactNumber: string;

  @Prop()
  companyContactNumber: string;

  @Prop({ required: true })
  taxExemption: string;

  @Prop({ required: true, unique: true })
  companyEmail: string;

  @Prop({ required: true, unique: true })
  personalEmail: string;

  @Prop({ type: JSON })
  payrollBankAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankBranch: string;
  };

  @Prop({ required: true })
  civilStatus: string;

  @Prop()
  religion: string;

  @Prop()
  NumberOfDependents: number;

  @Prop()
  sss: string;

  @Prop()
  philHealth: string;

  @Prop()
  pagIbig: string;

  @Prop()
  tin: string;

  @Prop()
  presentCity: string;

  @Prop()
  permanentCity: string;

  @Prop()
  presentZipCode: string;

  @Prop()
  permanentZipCode: string;

  @Prop()
  presentRegion: string;

  @Prop()
  permanentRegion: string;

  @Prop()
  permanentResidenceAddress: string;

  @Prop()
  presentResidenceAddress: string;

  @Prop()
  highestEducationalAttainment: string;

  @Prop()
  elementaryYrFrom: number;

  @Prop()
  elementaryYrTo: number;

  @Prop()
  elementarySchoolAndAddress: string;

  @Prop()
  elementaryHonors: string;

  @Prop()
  secondaryYrFrom: number;

  @Prop()
  secondaryYrTo: number;

  @Prop()
  secondarySchoolAndAddress: string;

  @Prop()
  secondaryHonors: string;

  @Prop()
  tertiaryYrFrom: number;

  @Prop()
  tertiaryYrTo: number;

  @Prop()
  tertiarySchoolAndAddress: string;

  @Prop()
  tertiaryDegree: string;

  @Prop()
  tertiaryHonors: string;

  @Prop()
  postGradYrFrom: number;

  @Prop()
  postGradYrTo: number;

  @Prop()
  postGradSchoolAndAddress: string;

  @Prop()
  postGradDegree: string;

  @Prop()
  postGradHonors: string;

  @Prop()
  othersYrFrom: number;

  @Prop()
  othersYrTo: number;

  @Prop()
  othersSchoolAndAddress: string;

  @Prop()
  othersDegree: string;

  @Prop()
  othersHonors: string;

  @Prop()
  licensure: string;

  @Prop({ required: true, type: JSON })
  emergencyContact: [
    {
      name: string;
      address: string;
      phoneNumber: string;
    },
  ];

  @Prop({ type: JSON })
  employmentRecords: [
    {
      yrFrom: number;
      yrTo: number;
      companyName: string;
      positionHeld: string;
    },
  ];

  @Prop({ type: JSON })
  govtProfExamsPassed: [
    {
      examTitle: string;
      dateTaken: Date;
      Rating: string;
    },
  ];

  @Prop({ type: JSON })
  licensesCertifications: [
    {
      name: string;
      authorizingEntity: string;
      validUntil: Date;
      licenseCertNo: string;
    },
  ];

  @Prop({ type: JSON })
  familyBackground: [
    {
      name: string;
      relation: string;
      occupation: string;
      company: string;
      residence: string;
    },
  ];

  @Prop()
  password: string; // USE FOR VALIDATION NOT INCLUDED IN DATABASE
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
