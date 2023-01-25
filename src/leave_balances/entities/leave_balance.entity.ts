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

  @Prop({ required: true })
  applicableMonth: string[];

  @Prop()
  SL: number;

  @Prop()
  SLTaken: number;

  @Prop()
  VL: number;

  @Prop()
  VLTaken: number;

  @Prop()
  BL: number;

  @Prop()
  BLTaken: number;

  @Prop()
  CL: number;

  @Prop()
  CLTaken: number;

  @Prop()
  ML: number;

  @Prop()
  MLTaken: number;

  @Prop()
  PL: number;

  @Prop()
  PLTaken: number;

  @Prop()
  SIL: number;

  @Prop()
  SILTaken: number;

  @Prop()
  BRL: number;

  @Prop()
  BRLTaken: number;

  @Prop()
  UL: number;

  @Prop()
  ULTaken: number;

  @Prop()
  dateUpdated: Date;

  @Prop()
  employeeDetails: string;

  @Prop()
  lastModifiedDate?: Date;
}

export const LeaveBalanceSchema = SchemaFactory.createForClass(LeaveBalance);
