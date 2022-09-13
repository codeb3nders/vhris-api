import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeHistoryDocument = Employee_history & Document;

@Schema({ strict: false })
export class Employee_history {
  @Prop({ required: true })
  employeeNo: string;

  @Prop({ default: Date.now() })
  lastModifiedDate: Date;

  @Prop()
  type: string;

  @Prop({ type: JSON })
  details: {};
}

export const EmployeeHistorySchema =
  SchemaFactory.createForClass(Employee_history);
