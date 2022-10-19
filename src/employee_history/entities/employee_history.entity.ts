import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeHistoryDocument = EmployeeHistory & Document;

@Schema({ collection: 'employee_history', strict: false })
export class EmployeeHistory {
  @Prop({ required: true })
  employeeNo: string;

  @Prop({ default: Date.now() })
  timestamp: Date;

  @Prop({ default: Date.now() })
  effectiveDate: Date;

  @Prop()
  type: string;

  @Prop({ type: JSON })
  details: {};
}

export const EmployeeHistorySchema =
  SchemaFactory.createForClass(EmployeeHistory);
