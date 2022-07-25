import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true })
  employeeNo: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  middleName: string;
  @Prop()
  fsCode: string;
  @Prop()
  bioCode: string;
  @Prop()
  position: string;
  @Prop()
  rank: string;
  @Prop()
  division: string;
  @Prop()
  department: string;
  @Prop()
  designation: string;
  @Prop()
  dateHired: Date;
  @Prop()
  yearsInService: number;
  @Prop()
  employmentStatus: string;
  @Prop()
  endOfProbationary: Date;
  @Prop()
  contractEndDate: Date;
  @Prop()
  gender: string;
  @Prop()
  birthDate: Date;
  @Prop()
  age: number;
  @Prop()
  contactNumber: string;
  @Prop()
  taxExemption: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  backAccountNo: string;
  @Prop()
  civilStatus: string;
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
  noticeOffense: string;
  @Prop()
  audit201: string;
  @Prop()
  remarks: string;
  @Prop()
  cocNo: string;
  @Prop()
  vaccineStatus: string;
  @Prop()
  digitalBulletin: string;
  @Prop()
  viberNumber: string;
  @Prop()
  vpdcEmail: string;
  @Prop()
  emergencyContactPerson: string;
  @Prop()
  emergencyAddress: string;
  @Prop()
  emergencyContactNo: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
