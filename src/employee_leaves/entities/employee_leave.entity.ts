import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeLeavesDocument = Employee_leaves & Document;

@Schema()
export class Employee_leaves {
  @Prop({ required: [true, 'employee number is required!'] })
  employeeNo: string;
  @Prop()
  leave: string;
  @Prop()
  allowance: string;
  @Prop()
  accrued_balance: string;
  @Prop()
  used: string;
}

export const EmployeeLeavesSchema = SchemaFactory.createForClass(Employee_leaves);




