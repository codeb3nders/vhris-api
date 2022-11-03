import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type EmployeeHistoryDocument = EmployeeHistory & Document;

@Schema({ collection: 'employee_history', strict: false })
export class EmployeeHistory {
  @Prop({ required: true, default: uuid })
  id: string;

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
