import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeLeavesDocument = EmployeeLeaves & Document;

@Schema({ collection: 'employee_leaves' })
export class EmployeeLeaves {
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

export const EmployeeLeavesSchema =
  SchemaFactory.createForClass(EmployeeLeaves);
