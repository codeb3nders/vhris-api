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
  contactNumber: string;
  @Prop({ required: true })
  taxExemption: string;
  @Prop({ required: true, unique: true })
  companyEmail: string;
  @Prop({ required: true, unique: true })
  personalEmail: string;
  @Prop({ required: true })
  backAccountNo: string;
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
  pagIbig?: string;
  @Prop()
  tin: string;
  @Prop()
  city: string;
  @Prop()
  zipCode: string;
  @Prop()
  region: string;
  @Prop()
  address: string;
  @Prop()
  course?: string;
  @Prop()
  educationalAttainment?: string;
  @Prop()
  schoolAttended?: string;
  @Prop()
  licensure: string;
  @Prop()
  prcIdNo: string;
  @Prop()
  audit201: string;
  @Prop()
  notes: string;
  @Prop()
  cocNo: string;
  @Prop()
  vpdcEmail: string;
  @Prop({ required: true })
  emergencyContactPerson: string;
  @Prop({ required: true })
  emergencyAddress: string;
  @Prop({ required: true })
  emergencyContactNo: string;
  @Prop()
  password?: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
