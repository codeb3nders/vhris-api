import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type LeaveBalanceDocument = LeaveBalance & Document;

@Schema({ collection: 'leave_balance' })
export class LeaveBalance {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true, default: Date.now() })
  timestamp: Date;

  @Prop({ required: true })
  employeeNo: string;

  @Prop()
  leaveType: string;

  @Prop()
  leaveBalance: number;

  @Prop()
  leaveTaken: number;

  @Prop()
  dateUpdated: Date;

  @Prop()
  employeeDetails: string;

  @Prop()
  lastModifiedDate?: Date;
}

export const LeaveBalanceSchema = SchemaFactory.createForClass(LeaveBalance);
