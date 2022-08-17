import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true })
  employeeNo: string;

  @Prop({ required: true })
  personalId: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  userGroup: string;

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
  payRateType: 'Bi monthly' | 'Weekly';

  @Prop()
  paymentMethod: 'Cash' | 'Check' | 'Payroll Account';

  @Prop()
  payrollGroup: 'Bi monthly' | 'Weekly';

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

  @Prop()
  password: string; // USE FOR VALIDATION NOT INCLUDED IN DATABASE
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
