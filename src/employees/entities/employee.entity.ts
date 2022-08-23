import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true })
  employeeNo: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  userGroup: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName: string;

  @Prop()
  suffix: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  civilStatus: string;

  @Prop({ required: true })
  citizenship: string;

  @Prop()
  religion: string;

  @Prop({ required: true })
  personalContactNumber: string;

  @Prop({ required: true, unique: true })
  personalEmail: string;

  @Prop({ type: JSON })
  presentAddress: {
    addressLine: string;
    city: string;
    zipCode: string;
    region: string;
    country: string;
  };

  permanentAddress: {
    addressLine: string;
    city: string;
    zipCode: string;
    region: string;
    country: string;
  };

  @Prop({ type: JSON })
  educationalBackground: [
    {
      level: string;
      yrFrom: number;
      yrTo: number;
      schoolAndAddress: string;
      degree: string;
      honors: string;
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

  @Prop({ required: true, type: JSON })
  emergencyContact: [
    {
      name: string;
      address: string;
      phoneNumber: string;
    },
  ];

  @Prop()
  companyContactNumber: string;

  @Prop({ required: true, unique: true })
  companyEmail: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  reportsTo: string;

  @Prop({ required: true })
  dateHired: Date;

  @Prop()
  endOfProbationary: Date;

  @Prop()
  contractEndDate: Date;

  @Prop({ required: true })
  rank: string;

  @Prop({ required: true })
  employmentStatus: string;

  employeeBenefits: string;
  @Prop()
  sss: string;

  @Prop()
  philHealth: string;

  @Prop()
  pagIbig: string;

  @Prop()
  tin: string;

  @Prop()
  NumberOfDependents: number;

  @Prop({ required: true })
  taxExemption: string;

  @Prop()
  basicPay: number;

  @Prop()
  payRateType: string;

  @Prop()
  paymentMethod: string;

  @Prop()
  payrollGroup: string;

  @Prop()
  deductionSSS: number;

  @Prop()
  deductPhilhealth: number;

  @Prop()
  deductHMDF: number;

  @Prop()
  fixedContributionRate: 'Bi monthly' | 'Weekly';

  @Prop()
  deductWithholdingTax: number;

  @Prop({ type: JSON })
  allowanceDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankBranch: string;
  };

  @Prop({ type: JSON })
  payrollBankAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankBranch: string;
  };

  @Prop()
  password: string; // USE FOR VALIDATION NOT INCLUDED IN DATABASE
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
